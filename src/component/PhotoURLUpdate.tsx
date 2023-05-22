import { LargeBtnWhite } from "../AuthLogin";
import { v4 as uuidv4 } from 'uuid';
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { authService, dbService, storage } from "../todoFirebase";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
export interface ProfileImgChangeProps {
    attach: string;
    changeImg: boolean;
    userUid: string;
}

const PhotoURLUpdate = ({ attach, changeImg, userUid }: ProfileImgChangeProps) => {
    const navigate = useNavigate();

    const onSubmit = async (data: string) => {
        let attachmentUrl;
        /* 파일 경로 참조 만들기, bucket에 유저아이디 폴더 / 랜덤한 이름(uuidv4())으로 참조 생성*/
        const fileRef = ref(storage, `${userUid}/${uuidv4()}`);
        // Data URL string upload
        const response = await uploadString(fileRef, data, "data_url");

        // `url` is the download URL
        attachmentUrl = await getDownloadURL(response.ref);
        try {
            authService.currentUser && await updateProfile(authService.currentUser, { photoURL: attachmentUrl });
            alert("프로필 변경사항을 저장하였습니다");
            navigate("/home");
        } catch (error: any) {
            console.log(error);
        }
    }

    return (
        <LargeBtnWhite changeImg={changeImg} as="button" style={{
            minWidth: "50%"
        }} onClick={() => onSubmit(attach)}>저장</LargeBtnWhite>
    );
}
export default PhotoURLUpdate;