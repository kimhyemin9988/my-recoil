# my-recoil

React,typescript로 작성한 반응형 일정관리 web 입니다.
할일을 입력하여 "할일", "하고 있는 일", "마친 일"로 카테고리를 구분할 수 있습니다.
할일을 추가 및 삭제 할 수 있습니다.
카테고리를 추가 및 삭제 할 수 있습니다.
분류된 할 일을 다른 카테고리로 변경할 수 있습니다.
모든 data는 local storage에 저장됩니다.

# [ PC Layout]

# [ Mobile Layout]

# Pages

https://kimhyemin9988.github.io/my-recoil/

# 적용기술
-React
-react-router-dom
-react-select
-react-hook-form
-typescript
-styled-components
-recoil(react 상태관리)

# Details
입력한 할일의 카테고리 default값은 "Todo"입니다.
Todo 카테고리로 이동하면 입력한 값을 볼 수 있습니다.

카테고리의 default값은 "Todo", "Done", "Doing"입니다.
react-select를 사용하여 카테고리를 선택하여 이동 & 삭제 할 수 있습니다. 
목록이 있는 카테고리를 삭제하려하면 alert경고문이 뜬 후 삭제되지 않고 main page로 이동합니다.

react-hook-form을 사용하여 form data를 관리합니다.