const LocalStrategy = require('passport-local').Strategy;
module.exports = (app) => {
    // 挂载 strategy
    app.passport.use(new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'userName',
        passwordField: 'password',
    }, (req, userName, password, done) => {
        const user = {
            provider: 'local',
            userName,
            password,
        };
        app.passport.doVerify(req, user, done);
    }));

    // 处理用户信息
    app.passport.verify(async (ctx, user) => {
        if (ctx.session.code != ctx.request.body.img) {
            return {
                status: 401,
                message: "验证码不正确"
            }
        }
        let existUser = await ctx.service.users.login(user);
        if (existUser) {
            if (!existUser.isAdmin) {
                return {
                    status: 401,
                    message: "您没有权限！"
                }
            }
            //生成token
            return existUser
        }
        return {
            status: 401,
            message: "用户名或密码不正确"
        }
    });
}
