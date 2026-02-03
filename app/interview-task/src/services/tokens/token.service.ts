interface Tokens {
    access_token: string;
}


const getLocalAccessToken = (): string | null => {
    const token = localStorage.getItem("access_token");
    return token || null;
};

const updateLocalAccessToken = (newToken: string): void => {
    localStorage.setItem("access_token", newToken);
};

const removeAccessToken = (): void => {
    localStorage.removeItem("access_token");
};

export const TokenService = {
    getLocalAccessToken,
    updateLocalAccessToken,
    removeAccessToken,
};