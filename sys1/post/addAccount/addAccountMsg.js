const addAccountMsg = {
    addSuccess : {
        msgCode : "post_addaccount_msg_1",
        kor : "사용자 계정 추가에 성공했습니다.",
        eng : "User account addition was successful.",
    },
    addFail : {
        duplicated : {
            msgCode : "post_addaccount_msg_2",
            kor : "추가하시려는 사용자 계정은 이미 생성되어 있습니다.",
            eng : "The user account you are trying to add has already been created.",
        },
        dbFail : {
            msgCode : "post_addaccount_msg_3",
            kor : "요청 하신 계정정보를 데이터베이스에 기록하는데 실패 했습니다. 관리자에게 문의해주세요.",
            eng : "Requested account information failed to be recorded in the database. Please contact the administrator.",
        }
    }
}

module.exports = addAccountMsg;