class AuthenticationService {
    signOut() {
        localStorage.removeItem("user");
        localStorage.removeItem("stores");
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"));
    }
}

export default new AuthenticationService();
