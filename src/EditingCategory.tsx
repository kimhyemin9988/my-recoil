import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { Category } from "./Atoms";
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";
import { AsBtn } from "./home/CategoryAndList";
import { Container, CreateToForm, TodoInput } from "./home/CreateToDo";
import { Main } from "./home/Todo";
import { arrayRemove, arrayUnion, collection, doc, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { authService, dbService } from "./todoFirebase";
export interface categories {
  Category: string;
}

const EditingCategory = () => {
  const navigate = useNavigate();
  const docRef = doc(dbService, `${authService.currentUser?.uid}`, "category");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<categories>();

  const [oldCategory, setOldCategory] = useRecoilState(Category);

  useEffect(() => {
    onSnapshot(docRef, (doc) => {
      setOldCategory(doc.data()?.category);
    })
  }, []);

  const [addBoolean, setaddCategory] = useState(false);
  const [deleteBoolean, setdeleteCategory] = useState(false);

  /* output : form의 모든 객체 */
  const onSubmitCate = async ({ Category }: any) => {
    await updateDoc(docRef, {
      category: arrayUnion({ value: Category, label: Category })
    });
    setValue("Category", "");
    addCategory();
  };
  /* 카테고리 추가 */
  const addCategory = () => {
    setaddCategory((prev) => !prev);
  };
  /* 카테고리 삭제 */
  const deleteCategory = () => {
    setdeleteCategory((prev) => !prev);
  };

  /* 리스트 카테고리 변경 */
  const [handleValue, setHandleValue] = useState();

  /* 삭제할 카테고리 선택 */
  const handleChange = (e: any) => {
    console.log(e);
    const { value } = e; // value ==  "Todo"
    setHandleValue(() => value);
  };
  /* 삭제할 카테고리 제출 */
  const onSubmit = async (event: any) => {
    event.preventDefault();
    const q = query(collection(dbService, `${authService.currentUser?.uid}`), where("category", "==", `${handleValue}`));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size === 0) {
      await updateDoc(docRef,
        {
          category: arrayRemove({ value: `${handleValue}`, label: `${handleValue}` })
        }
      );
    }
    else {
      alert("해당하는 카테고리 안에 목록이 있습니다! 삭제할 수 없습니다");
      navigate("/home");
    }
    deleteCategory();
  };

  return (
    <>
      <Main>
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Link to="../home">
            <AsBtn as="button">홈으로</AsBtn>
          </Link>
          <div>
            {addBoolean ? (
              <CreateToForm
                style={{ flexWrap: "wrap" }}
                onSubmit={handleSubmit(onSubmitCate)}
              >
                <TodoInput
                  placeholder="추가할 카테고리를 입력하세요"
                  {...register("Category", {
                    required: {
                      value: true,
                      message: "공백을 입력할 수 없습니다",
                    },
                  })}
                ></TodoInput>
                <AsBtn as="button" type="submit">
                  추가
                </AsBtn>
                <AsBtn as="button" onClick={addCategory}>
                  추가 취소
                </AsBtn>
                <span>{errors.Category?.message}</span>
              </CreateToForm>
            ) : (
              <AsBtn as="button" onClick={addCategory}>
                카테고리 추가
              </AsBtn>
            )}
            {deleteBoolean ? (
              <>
                <h4 style={{ marginLeft: "10px" }}>
                  삭제할 카테고리를 선택하세요
                </h4>
                <form onSubmit={onSubmit}>
                  <Select
                    options={oldCategory}
                    onChange={handleChange} // 선택한 obj return
                  />
                  <AsBtn as="button" type="submit">
                    삭제
                  </AsBtn>
                  <AsBtn as="button" onClick={deleteCategory}>
                    삭제취소
                  </AsBtn>
                </form>
              </>
            ) : (
              <AsBtn as="button" onClick={deleteCategory}>
                카테고리 삭제
              </AsBtn>
            )}
          </div>
        </Container>
      </Main>
    </>
  );
};
export default EditingCategory;
