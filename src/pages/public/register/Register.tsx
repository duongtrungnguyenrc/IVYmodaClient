import classnames from "classnames/bind";
import { Content } from "../../../components";
import DefaultLayout from "../../../layouts/DefaultLayout";
import styles from "./styles.module.scss"
import { ReactEventHandler, useEffect, useState } from "react";
import axios from "axios";
import { useDebouncedCallback } from "use-debounce";
import NewUser from "../../../models/NewUser";
import customAxios from "../../../services/CustomAxios";
import { toast } from "react-toastify";

const cx = classnames.bind(styles);

const RegisterScreen = () => {
    const [ formData, setFormData ] = useState<NewUser>({name: "", birth: null, gender: "", email: "", phone: "", address: "", password: "", confirmPassword: "", capcha: ""});
    const [ addressData , setAddressData ] = useState<{ 
        cities: { ProvinceID: number, ProvinceName: string }[], 
        districts: { DistrictID: number, DistrictName: string }[], 
        wards: { WardID: number, WardName: string }[] }>({cities: [], districts: [], wards: []});
    const [ address, setAddress ] = useState<{ 
        city: { id: number, name: string },
        district: { id: number, name: string }, 
        ward: { id: number, name: string },
        addressDetail: string 
    }>({ city: { id: -1, name: "" }, district: { id: -1, name: "" }, ward: { id: -1, name: "" }, addressDetail: "" });
    const [ capcha, setCapcha ] = useState("...");
    const [ passwordVisible, setPasswordVisible ] = useState(false);

    // Generate Capcha

    const generateCapcha = () => {
        let result = "";
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i <= 6; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }
        setCapcha(result);
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        token != "undefined" && token ? location.href = "/" : undefined
        generateCapcha();
    }, []);

    // Generate address field with GHN API

    useEffect(() => {
        const fetchCities = async () => {
            const response = await axios.get("https://online-gateway.ghn.vn/shiip/public-api/master-data/province", {
                headers: {
                    Token: "c3ccf572-dd29-11ed-921c-de4829400020"
                }
            });
            if(response.status === 200) {
                setAddressData((prevState) => {
                    return {
                        ...prevState,
                        cities: response.data.data
                    }

                })
            }
        };

        const fetchDistricts = async () => {                        
            const response = await axios.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${address.city.id}`, {
                headers: {
                    Token: "c3ccf572-dd29-11ed-921c-de4829400020"
                }
            });
            if(response.status === 200) {
                setAddressData((prevState) => {
                    return {
                        ...prevState,
                        districts: response.data.data
                    }
                })
            }
        };

        const fetchWards = async () => {                        
            const response = await axios.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${address.district.id}`, {
                headers: {
                    Token: "c3ccf572-dd29-11ed-921c-de4829400020"
                }
            });
            if(response.status === 200) {
                setAddressData((prevState) => {
                    return {
                        ...prevState,
                        wards: response.data.data
                    }
                })
            }
        };

        if(!address.city.name) {
            fetchCities();
        }
        if(address.city.name && !address.district.name) {            
            fetchDistricts();
        }
        if(address.district.name && !address.ward.name) {
            fetchWards();
        }
        
    }, [ address.city.name, address.district.name ]);


    // Handle change address fields

    const handleAddressChange : ReactEventHandler = useDebouncedCallback((e) => {
        const name = e.target.name;
        const value : string = e.target.value;

        if(name.trim() === "addressDetail") {
            setAddress((prevState) => {
                return {
                    ...prevState,
                    [name]: value
                }
            });
            setFormData((prevState) => {
                return {
                    ...prevState,
                    address: `${value} - ${address.ward.name} - ${address.district.name} - ${address.city.name}`
                }
            })
        }
        else {
            setAddress((prevState) => {
                return {
                    ...prevState,
                    [name]: {
                        id: value.split("-")[0],
                        name: value.split("-")[1]
                    }
                }
            });
        }
    });

    // Handle form data change

    const handleFormDataChange : ReactEventHandler  = useDebouncedCallback((e) => {
        const name = e.target.name;
        const value : string = e.target.value;

        setFormData((prevState) => {
            return {
                ...prevState,
                [name]: value
            }
        })

    });

    // Handle submit

    const handleSubmit : ReactEventHandler = async (e) => {
        e.preventDefault();
        if(formData.password !== formData.confirmPassword) {
            toast.error("Mật khẩu không khớp!");
        }
        else if(formData.capcha.toLowerCase() !== capcha.toLowerCase()) {
            toast.error("Mã capcha không chính xác!");
        }
        else {
            const response = await toast.promise(customAxios.post("/auth/register", formData), {
                pending: 'Đang xác thực...',
                success: 'Đăng kí tài khoản thành công 👌',
                error: `Vui lòng kiểm tra lại thông tin 🤯`
            });
            if(response.status === 200) {
                setTimeout(() => {
                    location.href = "/login"
                }, 3000)
            }else {
                toast.error(response.data);
            }
        }
    }

    return (
        <DefaultLayout>
            <Content>
                <div className="text-center py-4">
                    <h2>Đăng kí</h2>
                </div>
                <form method="post" className="row py-3" onSubmit={handleSubmit}>
                    <div className="col-12 col-lg-6">
                        <div>
                            <h5>Thông tin khách hàng</h5>
                        </div>
                        <div className="row mt-3">
                            <div className="form-group">
                                <label htmlFor="">Họ và tên:</label>
                                <input name="name" className="form-control mt-2 py-3" placeholder="Họ và tên..." onChange={handleFormDataChange} required/>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="form-group col-6">
                                <label htmlFor="">Email:</label>
                                <input type="email" name="email" className="form-control mt-2 py-3" placeholder="Email..." onChange={handleFormDataChange} required/>
                            </div>
                            <div className="form-group col-6">
                                <label htmlFor="">Số điện thoại:</label>
                                <input type="phone" name="phone" className="form-control mt-2 py-3" placeholder="Điện thoại..." onChange={handleFormDataChange} required/>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="form-group col-6">
                                <label htmlFor="">Ngày sinh:</label>
                                <input type="date" name="birth" className="form-control mt-2 py-3" onChange={handleFormDataChange} required/>
                            </div>
                            <div className="form-group col-6">
                                <label htmlFor="">Giới tính:</label>
                                <select name="gender" className="form-control mt-2 py-3" onChange={handleFormDataChange} required>
                                    <option value="" selected disabled>Giới tính</option>
                                    <option value="MALE">Nam</option>
                                    <option value="FEMALE">Nữ</option>
                                </select>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="form-group col-6">
                                <label htmlFor="">Tỉnh/Thành phố:</label>
                                <select name="city" className="form-control mt-2 py-3" onChange={handleAddressChange} required>
                                    <option value="" selected disabled>Chọn Tỉnh / Thành phố</option>
                                    {
                                        addressData?.cities && addressData?.cities.map((city) => {
                                            return <option key={city.ProvinceID} value={ city.ProvinceID + "-" + city.ProvinceName }>{ city.ProvinceName }</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-group col-6">
                                <label htmlFor="">Quận/Huyện:</label>
                                <select name="district" className="form-control mt-2 py-3" onChange={handleAddressChange} required>
                                    <option value="" selected disabled>Chọn Quận / Huyện</option>
                                    {
                                        addressData?.districts && addressData?.districts.map((district) => {
                                            return <option key={district.DistrictID} value={ district.DistrictID + "-" + district.DistrictName }>{ district.DistrictName }</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="">Phường/Xã:</label>
                            <select name="ward" className="form-control mt-2 py-3" onChange={handleAddressChange} required>
                                    <option value="" selected disabled>Chọn Phường / Xã</option>
                                    {
                                        addressData?.wards && addressData?.wards.map((ward) => {
                                            return <option key={ward.WardID} value={ ward.WardID + "-" + ward.WardName }>{ ward.WardName }</option>
                                        })
                                    }
                            </select>
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="">Địa chỉ:</label>
                            <textarea className="form-control mt-2 py-3" name="addressDetail" rows={5} onChange={handleAddressChange} disabled={address.ward.name === ""} required/>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6">
                        <div>
                            <h5>Thông tin mật khẩu</h5>
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="">Mật khẩu:</label>
                            <input type={passwordVisible ? "text" : "password"} name="password" className="form-control mt-2 py-3" placeholder="Mật khẩu..." onChange={handleFormDataChange} required/>
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="">Xác nhận mật khẩu:</label>
                            <input type={passwordVisible ? "text" : "password"} name="confirmPassword" className="form-control mt-2 py-3" placeholder="Nhập lại mật khẩu..." onChange={handleFormDataChange} required/>
                        </div> 
                        <div className="form-group mt-3">
                            <label htmlFor="">Vui lòng nhập mã capcha bên dưới:</label>
                            <input name="capcha" className="form-control mt-2 py-3" placeholder="Kí tự xác nhận..." onChange={handleFormDataChange} required/>
                        </div>
                        <div className="d-flex align-items-end">
                            <div className="form-group mt-3">
                                <label htmlFor="">Capcha:</label>
                                <input type="text" value={capcha} className={cx("capcha") + " form-control rounded-0 mt-2 bg-light"} disabled readOnly/>
                            </div>
                            <button type="button" className="btn ms-3" onClick={() => generateCapcha()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                                    <path d="M10 11H7.101l.001-.009a4.956 4.956 0 0 1 .752-1.787 5.054 5.054 0 0 1 2.2-1.811c.302-.128.617-.226.938-.291a5.078 5.078 0 0 1 2.018 0 4.978 4.978 0 0 1 2.525 1.361l1.416-1.412a7.036 7.036 0 0 0-2.224-1.501 6.921 6.921 0 0 0-1.315-.408 7.079 7.079 0 0 0-2.819 0 6.94 6.94 0 0 0-1.316.409 7.04 7.04 0 0 0-3.08 2.534 6.978 6.978 0 0 0-1.054 2.505c-.028.135-.043.273-.063.41H2l4 4 4-4zm4 2h2.899l-.001.008a4.976 4.976 0 0 1-2.103 3.138 4.943 4.943 0 0 1-1.787.752 5.073 5.073 0 0 1-2.017 0 4.956 4.956 0 0 1-1.787-.752 5.072 5.072 0 0 1-.74-.61L7.05 16.95a7.032 7.032 0 0 0 2.225 1.5c.424.18.867.317 1.315.408a7.07 7.07 0 0 0 2.818 0 7.031 7.031 0 0 0 4.395-2.945 6.974 6.974 0 0 0 1.053-2.503c.027-.135.043-.273.063-.41H22l-4-4-4 4z"></path>
                                </svg>
                            </button>
                        </div>
                        <div className="form-check mt-3">
                            <input className="form-check-input" type="checkbox" onChange={(e) => setPasswordVisible((e.target.checked))}/>
                            <label className="form-check-label">Hiện mật khẩu</label>
                        </div>
                        <button type="submit" className={cx("submit-btn") + " w-100 mt-3"}>Đăng kí</button>
                    </div>
                </form>
            </Content>
        </DefaultLayout>
    );
};
export default RegisterScreen;