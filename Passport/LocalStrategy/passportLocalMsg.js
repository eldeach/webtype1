const passportLocalMsg = {
    loginSuccess : {
        msgCode : "passport_local_msg_1",
        kor : "로그인이 성공하였습니다.",
        eng : "Login was successful."
    },
    loginFail : {
        userLock : {
            msgCode : "passport_local_msg_2",
            kor : "이 계정은 잠겨있습니다.",
            eng : "This account is locked.",
        },
        wrongPW : {
            msgCode : "passport_local_msg_3",
            kor : "잘못된 비밀번호입니다.",
            eng : "Incorrect password.",
        },
        noAccount : {
            msgCode : "passport_local_msg_4",
            kor : "이 계정은 없는 계정입니다.",
            eng : "This account does not exist.",
        },
    }
}

module.exports = passportLocalMsg;