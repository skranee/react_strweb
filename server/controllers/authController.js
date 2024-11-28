class AuthController {
    loginWithFacebook = (req, res) => {
        res.redirect('/]');
    };

    loginWithGoogle = (req, res) => {
        res.redirect('');
    };

    getProfile = (req, res) => {
        if (!req.isAuthenticated()) {
            return res.status(401).json({ message: 'Not authenticated' });
        }
        res.json(req.user);
    };

    logout = (req, res) => {
        req.logout((err) => {
            if (err) return res.status(500).json({ message: 'Error logging out' });
            res.redirect('/');
        });
    };

}

export default new AuthController();