import { deleteUser } from "firebase/auth";
import { LargeBtnWhite } from "../AuthLogin";
import { authService } from "../todoFirebase";

const DeleteUser = () => {
    const user = authService.currentUser;
    const deleteUserFx = async () => {
        try {
            user && await deleteUser(user);
            alert("계정이 삭제되었습니다.");
        } catch (error: any) {
            // An error ocurred
            switch (error.code) {
                case "auth/requires-recent-login":
                    return "사용자 재인증이 필요합니다.";
                case "auth/network-request-failed":
                    return "네트워크 연결에 실패 하였습니다.";
                default:
                    return "회원탈퇴에 실패 하였습니다.";
            }
        }
    }
    return (
        <LargeBtnWhite style={{ color: "red" }} onClick={deleteUserFx}>회원탈퇴</LargeBtnWhite>
    );
}
export default DeleteUser;