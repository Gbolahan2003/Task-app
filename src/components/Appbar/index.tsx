import { useEffect } from "react";
import { defaultAvatar } from "../../assets/images";
import { BellIcon, GearIcon, MenuIcon } from "../../assets/svg";
import "./styles.scss";
import { logger } from "../../utils";
import CustomIconButton from "../IconButton";
import { useAppDispatch } from "../../hooks/store";
import { logoutFeature } from "../../redux-store/features/auth/features";
import { useNavigate } from "react-router-dom";

export default function Appbar() {
    useEffect(() => logger("Render Appbar"), []);
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const LogOut = async()=>{
        try {
            const logging = await dispatch(logoutFeature())
            sessionStorage.removeItem('token')
            navigate('/login')
            if(logging){
    
            }
            
        } catch (error) {
            console.log(error);
            
        }
    }


    return (
        <header className="app-bar">
            <div className="container d-flex flex-row justify-content-between align-items-center p-4 pt-5 pt-md-4">
                <h3 className="title">ToDo</h3>

                <div className={'actions d-none d-md-flex flex-row align-items-center'}>
                   <div className="logout" onClick={LogOut}>
                   <GearIcon />
                   </div>

                    <BellIcon />

                    <img src={defaultAvatar} alt="avatar" className="avatar" />
                </div>

                <div className="menu d-flex d-md-none justify-content-end">
                    <CustomIconButton >
                        <MenuIcon />
                    </CustomIconButton>
                </div>
            </div>
        </header>
    )
}