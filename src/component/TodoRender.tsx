import { useState } from "react";
import Select from "react-select";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Category, Todos, IToDo } from "../Atoms";
import { SubmitInput } from "../home/CreateToDo";
import { customStyles } from "../home/CategoryAndList";
import { authService, dbService } from "../todoFirebase";
import { IuserData } from "../profile/Profile";
import { collection, deleteDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import collectionGet from "../home/collectionGet";

const MiniForm = styled.form`
  width: 350px;
  display: flex;
  margin: 5px;
`;
const AsBtnMargin = styled(SubmitInput)`
  width: fit-content;
  margin: 0px;
  margin-left: 5px;
`;

const TodoRender = ({ text, id, category }: IToDo) => {
  const user = authService.currentUser as IuserData;

  /* Cloud Firestore의 참조 설정 */
  const usersCollectionRef = collection(dbService, `${user.uid}`);
  const q = query(usersCollectionRef, where("id", "==", id));
  const setTodosArray = useSetRecoilState(Todos);

  /* 카테고리 변경 on off */
  const [cateSelect, setcateSelect] = useState(false);
  const togglecategories = () => {
    setcateSelect((prev) => !prev);
  };
  /* 리스트 카테고리 변경 */
  const oldCategory = useRecoilValue(Category);
  const [handleValue, setHandleValue] = useState();
  /* 선택 */
  const handleChange = (e: any) => {
    const { value } = e; // value ==  "Todo"
    setHandleValue((prev) => prev = value);
  };

  /* 제출 */
  const onSubmit = async (event: any) => {
    event.preventDefault();
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      await updateDoc(doc.ref, {
        category: handleValue
      });
    });
    togglecategories();
    collectionGet(category, user.uid, setTodosArray);
  };
  /* 삭제 */
  const deleteList = async (event: any) => {
    event.preventDefault();
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
    collectionGet(category, user.uid, setTodosArray);
  };

  return (
    <>
      {cateSelect ? (
        <>
          <MiniForm onSubmit={onSubmit}>
            <Select
              options={oldCategory}
              onChange={handleChange} // 선택한 obj return
              styles={customStyles}
            />
            <AsBtnMargin as="button" type="submit">
              제출
            </AsBtnMargin>
            <AsBtnMargin as="button" type="button" onClick={togglecategories}>
              취소
            </AsBtnMargin>
          </MiniForm>
        </>
      ) : (
        <div>
          <SubmitInput as="button" onClick={deleteList}>
            삭제
          </SubmitInput>
          <SubmitInput as="button" onClick={togglecategories}>
            카테고리 변경
          </SubmitInput>
        </div>
      )}
    </>
  );
};

export default TodoRender;
