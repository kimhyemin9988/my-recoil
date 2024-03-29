import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { useState, useEffect } from "react";
import { authService } from "./todoFirebase";

export const GlobalStyle = createGlobalStyle`
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
`;

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [inital, setinital] = useState(false); // 초기화
  useEffect(() => {
    if (location.pathname === "/") {
      authService.onAuthStateChanged((user) => {
        user ? navigate("/home") : navigate("/login");
      });
    }
    setinital((prev) => (prev = true));
  }, []);

  return (
    <>
      <GlobalStyle />
      {inital && <Outlet></Outlet>}
    </>
  );
};

export default App;
