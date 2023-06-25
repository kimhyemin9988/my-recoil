import { collection, query, where, onSnapshot, getDocs } from "firebase/firestore";
import { IToDo } from "../Atoms";
import { SetterOrUpdater } from "recoil";
import { dbService } from "../todoFirebase";

const collectionGet = async (value: string | undefined, userId: string, setTodosArray: SetterOrUpdater<IToDo[]>) => {
    const usersCollectionRef = collection(dbService, `${userId}`);
    let array: IToDo[] = [];
    const q = query(usersCollectionRef, where("category", "==", `${value}`));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const data = doc.data() as IToDo;
        array = [...array, data]
    });
    setTodosArray((prev) => prev = array);
};
export default collectionGet;