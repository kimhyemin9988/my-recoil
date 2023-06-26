import { deleteUser } from "firebase/auth";
import { LargeBtnWhite } from "../AuthLogin";
import { authService, dbService } from "../todoFirebase";
import { useNavigate } from "react-router-dom";
import { storage } from "../todoFirebase";
import {
  ListResult,
  StorageReference,
  deleteObject,
  listAll,
  ref,
} from "firebase/storage";
import { collection, deleteDoc, getDocs } from "firebase/firestore";

const DeleteUser = () => {
  const user = authService.currentUser;
  const navigate = useNavigate();

  const deleteUserFile = (response: ListResult) => {
    response.items.forEach((itemRef: StorageReference) => {
      try {
        deleteObject(itemRef);
      } catch (error: any) {
        switch (error.code) {
          case "storage/unauthenticated":
            alert(
              "사용자가 인증되지 않았습니다. 인증한 후 다시 시도해 보세요."
            );
            navigate("/login");
            return "사용자 재인증이 필요합니다.";
          default:
            return "파일 삭제를 실패하였습니다.";
        }
      }
    });
  };

  const listAllFiles = async () => {
    //storage 삭제
    const desertRef = ref(storage, `${user?.uid}`);
    const response = await listAll(desertRef);
    if (response.items.length !== 0) {
      deleteUserFile(response);
    }
    //collection 삭제
    const usersCollectionRef = collection(dbService, `${user?.uid}`);
    const querySnapshot = await getDocs(usersCollectionRef);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  };

  const deleteUserFx = async () => {
    alert(
      "사용하고 계신 계정은 탈퇴할 경우 복구가 불가능합니다. 탈퇴 후 회원정보 및 이용기록은 모두 삭제됩니다."
    );
    try {
      await listAllFiles();
      user && (await deleteUser(user));
      alert("계정이 삭제되었습니다.");
    } catch (error: any) {
      // An error ocurred
      switch (error.code) {
        case "auth/requires-recent-login":
          alert("사용자 재인증이 필요합니다");
          navigate("/login");
          return "사용자 재인증이 필요합니다.";
        case "auth/network-request-failed":
          return "네트워크 연결에 실패 하였습니다.";
        default:
          return "회원탈퇴에 실패 하였습니다.";
      }
    }
  };
  return (
    <LargeBtnWhite style={{ color: "red" }} onClick={deleteUserFx}>
      회원탈퇴
    </LargeBtnWhite>
  );
};
export default DeleteUser;
