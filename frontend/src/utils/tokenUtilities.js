function isTokenExpired()
{
    const token = getAccessToken();
    if(token === null)
        return true;
    if(token.createdAt<(Date.now()-7200000))
        return true;
    return false;
}

const getAccessToken = ()=>{
    const tokenObject = JSON.parse(localStorage.getItem("token"));
    if(tokenObject)
        return tokenObject.accessToken;
    return null;
}


const setAccessToken = (accessToken)=>{
    const tokenObject = {
        accessToken,
        createdAt: Date.now()
    }
    localStorage.setItem("token", JSON.stringify(tokenObject));
}

export {isTokenExpired, getAccessToken, setAccessToken};