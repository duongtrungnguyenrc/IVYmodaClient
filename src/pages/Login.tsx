import { FormEventHandler, useEffect, useState } from "react";
import { Content } from "../components";

import axios from "../services/CustomAxios";
import DefaultLayout from "../layouts/DefaultLayout";
import { useDebouncedCallback } from "use-debounce";
import { toast } from "react-toastify";

const Login = () => {
    const [ formData, setFormData ] = useState<{ email: string, password: string }>({ email: "", password: "" });

    useEffect(() => {
        const token = localStorage.getItem("token");
        token != "undefined" && token ? location.href = "/" : undefined
    }, []);

    const handleLogin = async (e : any) => {
        e.preventDefault();
        try {
            const response = await toast.promise(
                axios.post("auth/login", formData),
                {
                  pending: 'Đang xác thực...',
                  success: 'Đăng nhập thành công 👌',
                  error: `Sai email hoặc mật khẩu 🤯`
                }
            );
            if(response.status === 200) {
                localStorage.setItem("token", response.data.data.token);
                localStorage.setItem("uid", response.data.data.userId);
                if(response.data.data.role === "ROLE_ADMIN") {
                    location.href = "/admin/products";
                }
                else {
                    location.href = "/";
                }
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    const handleChange : FormEventHandler = useDebouncedCallback((e) => {
        const name : string = e.target.name;
        const value : string = e.target.value;
        
        setFormData((prevState) => {
            return {
                ...prevState,
                [name] : value
            }
        });
        setTimeout(() => {
            console.log(formData);
        }, 500)
    }, 300);
    
  return <DefaultLayout>
             <Content>
                <div className="d-flex justify-content-between container py-5">
                    <div className="login-form d-flex flex-column col-5">
                        <div className="login-form-header text-center mb-3">
                            <b>Bạn đã có tài khoản IVY</b>
                        </div>
                        <div className="login-form-header text-center mb-3">
                            Nếu bạn đã có tài khoản, hãy đăng nhập để tích lũy điểm thành viên và nhận được những ưu đãi tốt hơn!
                        </div>
                        <div className="login-form px-5">
                            <form id="login-form" onSubmit={(e) => handleLogin(e)}>
                                <div className="form-outline mb-3">
                                    <input type="email" name="email"
                                        className="form-control p-3" 
                                        placeholder="Email/SĐT" 
                                        onChange={(e) => handleChange(e)}
                                        required
                                    />
                                </div>

                                <div className="form-outline mb-3">
                                    <input type="password" 
                                        name="password" 
                                        className="form-control p-3" 
                                        placeholder="Mật khẩu" 
                                        onChange={(e) => handleChange(e)}
                                        required
                                    />
                                </div>

                                <div className="form-check mb-3">
                                    <input type="checkbox" id="save-password-btn" className="form-check-input" />
                                    <label className="form-check-label text-secondary">Save password</label>
                                </div>
                                <button type="submit" className="btn btn-lg w-100 btn-dark mb-3" disabled={!formData.email || !formData.password}>Đăng nhập</button>
                                <div className="d-flex w-100 gap-1">Don't have account? <a className="text-decoration-none" href="">create one!</a></div>
                            </form>
                        </div>
                    </div>
                    <div className="register col-5">
                        <div className="register-content">
                            <div className="login-form-header text-center mb-3">
                                <b>Bạn đã có tài khoản IVY</b>
                            </div>
                        </div>
                        <p className="text-center mb-0">Nếu bạn chưa có tài khoản trên ivymoda.com, hãy sử dụng tùy chọn này để truy cập biểu mẫu đăng ký.</p>
                        <p className="text-center mb-4">Bằng cách cung cấp cho IVY moda thông tin chi tiết của bạn, quá trình mua hàng trên ivymoda.com sẽ là một trải nghiệm thú vị và nhanh chóng hơn!</p>
                        <a href="/register" className="btn w-100 btn-lg btn-dark">Đăng ký</a>
                    </div>
                </div>
            </Content>
        </DefaultLayout>;
};
export default Login;