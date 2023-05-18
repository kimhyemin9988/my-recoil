import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Todo from './Todo';
import AuthLogin from './AuthLogin';
import { useState } from "react";
import { authService } from './todoFirebase';
import { Navigate } from "react-router-dom";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "LINESeedKR-Bd", "Open Sans", "Helvetica Neue", sans-serif;
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/LINESeedKR-Bd.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
}

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: normal;
	background-color: #E3D6E7;
	color:#62403F;
	font-family: "LINESeedKR-Bd", "Open Sans", "Helvetica Neue", sans-serif;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
a{
    color: inherit;
    text-decoration: none;
}
`

const App = () => {
	const [inital, setinital] = useState(false); // 초기화
	const [userLogin, setuserLogin] = useState(false); // 로그인 여부
	authService.onAuthStateChanged((user) => {
		if (user) {
			// User is signed in
			setuserLogin((prev) => prev = true);
			//const uid = user.uid;
		}
		else {
			setuserLogin((prev) => prev = false);
		}
		setinital((prev) => prev = true);
	})
	return (
		<>
			<GlobalStyle />
			{inital &&
				<Outlet />//로그인, 회원가입, 보호경로
				//세가지
				
				//state={{ from: location }} replace ={true}
				//URL을 "끝까지" 일치
				//login/33 => 오류가 발생했습니다, 홈으로 돌아가기 버튼

				// outlet -> todo나 카테고리 보호 x
				//outlet에서 path에 따라 랜더링 됨.
				//userLogin에 따라서 랜더링되는게 달라짐
				//트위터 home으로 가려해도 -> 로그인 화면으로 됨. (리디렉션 사용)
				//보호기능
				//프로필 수정 -> 로그인 화면으로

			}
		</>
	);
}

export default App;
