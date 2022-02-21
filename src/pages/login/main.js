import { User } from "@/service";
import utils from "@/utils/utils";
const { storage } = utils;
export default {
    name: "Login",
    data() {
        return {
            state:false,
            login_class:undefined,
            img_class:undefined,
            loading: false,
            remember: true,
            code: "/api/login/checkcode",
            forms: {
                userName: "",
                password: "",
                img: ""
            },
            rules: {
                userName: {
                    required: true,
                    message: "The userName cannot be empty",
                    trigger: "blur"
                },
                password: {
                    required: true,
                    message: "The password cannot be empty",
                    trigger: "blur"
                },
                img: {
                    required: true,
                    message: "The checkcode cannot be empty",
                    trigger: "blur"
                }
            }
        };
    },
    created() {
        this.initPwdLocal();
    },
    methods: {
        resetCode() {
            this.code = `${this.code}?t=${+new Date()}`;
            this.forms.img = "";
        },
        click_img() {
          this.state = !this.state
          if(this.state){
            this.img_class = 'img_class'
            this.login_class = 'form-wrap login_class'
          }
          else {
            this.img_class = 'hide'
          }
        },
        async submit() {
            let result = await this.$refs.forms.validate();
            if (!result) return;
            this.loading = true;
            try {
                let { data } = await User.login(
                    this.$QS.stringify(this.forms)
                );
                this.loading = false;
                this.$Message.success("登录成功");
                this.pwdlocal();
                this.$store.commit("users/users", data);
                this.$router.replace({ name: "User" });
            } catch (e) {
                this.loading = false;
                this.resetCode();
            }
        },
        //记住密码
        pwdlocal() {
            if (this.remember) {
                storage.setLocal("password", this.forms.password);
                storage.setLocal("userName", this.forms.userName);
            } else {
                storage.setLocal("password", "");
                storage.setLocal("userName", "");
            }
        },
        //获取密码
        initPwdLocal() {
            if (this.remember) {
                this.forms.password = storage.getLocal("password")||"";
                this.forms.userName = storage.getLocal("userName")||"";
            }
        }
    }
};
