import React, { useEffect, useState } from 'react'
import FileBase64 from 'react-file-base64';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Button, ThemeProvider } from '@mui/material';
import Card1 from './components/Card1';
import "./App.css"
import Brightness4Icon from "@mui/icons-material/Brightness4";

import { lightTheme, darkTheme } from "./theme/theme";
import Card2 from './components/Card2';
import Btn1 from './components/Btn1';

//navigator 
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import { Navigation } from 'swiper/modules';

//modal
import { Box, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

///style text
const gradientText = {
  background: 'linear-gradient(129deg, #7ECAA6 29.43%, #61BDD1 48.17%, #CF6DDD 63.17%, #4061F8 75.98%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  display: 'inline-block',
};

function App() {

  // Dark Mode
  const storedTheme = localStorage.getItem("darkMode");

  const [darkMode, setDarkMode] = useState(storedTheme == true);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;

    setDarkMode(newDarkMode); //
    localStorage.setItem("darkMode", newDarkMode);
  };

  const theme = darkMode ? darkTheme : lightTheme;


  //translate
  const [translate, setTranslate] = useState("en")
  const { t, i18n } = useTranslation()

  const changeLanguage = (language) => {
    i18n.changeLanguage(language)
  }


  const api = "http://localhost:3000/data"

  const [base64F, setBase64F] = useState(null)
  const [base64F1, setBase64F1] = useState(null)

  const handleImg = (file) => {
    setBase64F(file.base64)
  }

  const handleImg1 = (file) => {
    setBase64F1(file.base64)
  }

  //modal 
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //modal  add
  const [openAdd, setOpenAdd] = useState(false);

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };


  const [todo, setTodo] = useState([])
  const [addName, setAddName] = useState("")
  const [addEmail, setAddEmail] = useState("")

  const [editName, setEditName] = useState("")
  const [editEmail, setEditEmail] = useState("")
  const [idx, setIdx] = useState(null)



  // function get
  async function get() {
    try {
      let { data } = await axios.get(api)
      setTodo(data)
    }
    catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    get()
  }, [])


  // Delete user
  async function deleteUser(id) {
    try {
      let { data } = await axios.delete(`${api}/${id}`)
      get()
    } catch (error) {
      console.log(error);
    }
  }

  // Edit user
  async function editUser(id, user) {
    try {
      let { data } = await axios.put(`${api}/${id}`, user);
      get()
    } catch (error) {
      console.log(error);
    }
  }

  // Add user
  async function addUser(user) {
    try {
      let { data } = await axios.post(api, user)
      get()
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
      <ThemeProvider theme={theme}>

        {/* header */}
        <header>
          {/* tel */}
          <img src="src/assets/header/image 1792.png" className="w-[100%] lg:hidden sm:block md:hidden" />
          <nav className='lg:px-[100px] lg:py-[40px] flex lg:justify-between md:justify-between md:px-[50px] sm:justify-center sm:gap-[20px] sm:py-[20px]'>
            <aside className='flex items-center gap-[36px]'>
              <img src="src/assets/Frame 1494.png" className="rounded-[50px] bg-[rgb(230,247,254)] lg:block sm:hidden md:block" />
              <img src="src/assets/header/Union.png" alt="" />
              <Button sx={{ background: "rgb(64, 97, 248)", textTransform: "none", color: "white", paddingTop: "15px", paddingBottom: "15px", paddingRight: "50px", paddingLeft: "50px", borderRadius: "30px" }}>{t("t1")}</Button>
            </aside>

            {/* right */}
            <aside className='flex items-center gap-[60px]'>
              <div className='lg:flex sm:hidden md:flex items-center gap-[15px]'>
                <img src="src/assets/header/Group 1471.png" />
                <img src="src/assets/header/Group 1472.png" />
              </div>
              <div className='lg:flex items-center gap-[50px] sm:hidden'>
                <div className='flex items-start'>
                  <h1 className='text-[#4061F8] font-[700]'>{t("t2")}</h1>
                  <img src="src/assets/header/image 328.png" className="absolute" />
                </div>
                <h1 className='font-[800]'>{t("t3")}</h1>
                <div className='flex items-center gap-[10px]'>
                  <h2 className='font-[800]'>{t("t4")}</h2>
                  <img src="src/assets/header/Group 1485.png" alt="" />
                </div>
              </div>
              <select className='rounded-[50px] bg-[#73c1d0] p-[5px] text-[18px]'
                value={translate}
                onChange={(e) => {
                  changeLanguage(e.target.value)
                  setTranslate(e.target.value)
                }}
              >
                <option value="en" className='text-[white]'>En</option>
                <option value="ru">Ru</option>
              </select>
              <Brightness4Icon onClick={toggleDarkMode}/>
            </aside>
          </nav>

          <div className='flex items-start justify-between'>
            <aside className='flex items-center lg:gap-[54px] sm:gap-[20px] md:px-[60px] lg:pl-[120px] sm:px-[20px]'>
              <img src="src/assets/header/arrow-narrow-left.png" />
              <h1 className='flex items-center gap-[3px]'>{t("t5")}
                <img src="src/assets/header/chevron-right.png" alt="" />
                <span className='text-[#BDBFC8] lg:block sm:hidden md:block'>{t("t6")}</span>
                <span className='text-[#BDBFC8] lg:hidden sm:block md:hidden'>{t("t11")}</span>
              </h1>
            </aside>
            <aside>
              <img src="src/assets/header/Rectangle 1701.png" className="absolute sm:hidden lg:block right-[-0.05px] w-[35%] z-[-1]" />
            </aside>
          </div>

          <div className='flex justify-between lg:pr-[200px] md:px-[50px] lg:pl-[150px] items-center lg:py-[50px] sm:px-[20px] sm:py-[30px]'>
            <aside>
              <h1 className='lg:text-[62px] sm:text-[36px] font-[700]'>{t("t7")}</h1>
              <h1 className='lg:text-[62px] sm:text-[36px] font-[700]' style={gradientText} id="jk">{t("t8")}</h1>
              <h1 className='lg:text-[62px] sm:text-[36px] font-[700]' style={gradientText}>{t("t9")}</h1>
              <p className='font-[700] pt-[20px]'>{t("t10")}</p>
            </aside>
            <aside>
              <img src="src/assets/header/Depositphotos_187294588_XL 1.png" className='sm:hidden lg:block' />
            </aside>
          </div>

        </header>


        {/* main */}
        <main>

          {/* section1 */}
          <section>
            <div className='lg:px-[250px] lg:justify-center flex flex-wrap lg:gap-[60px] sm:gap-[25px] lg:py-[80px] sm:py-[60px] sm:px-[30px]'>
              <div className='sm:pl-[80px] lg:pl-[0]'><Card1 img={"src/assets/main/card1/Rectangle 1691.png"} h1={t("t12")} p={t("t13")} /></div>
              <div className='lg:pt-[60px]'><Card1 img={"src/assets/main/card1/Rectangle 1694.png"} h1={t("t18")} p={t("t19")} /></div>
              <div className='ml-[40px]'><Card1 img={"src/assets/main/card1/Rectangle 1692.png"} h1={t("t14")} p={t("t15")} /></div>
              <div className='sm:ml-[100px] lg:ml-[0]'><Card1 img={"src/assets/main/card1/Group 179935741.png"} h1={t("t20")} p={t("t21")} /></div>
              <div className='lg:pt-[50px]'><Card1 img={"src/assets/main/card1/Rectangle 1693.png"} h1={t("t16")} p={t("t17")} /></div>
              <div className='sm:ml-[80px] lg:ml-[0]'><Card1 img={"src/assets/main/card1/Group 179935742.png"} h1={t("t22")} p={t("t23")} /></div>
            </div>
          </section>

          {/* section 2*/}
          <section className='v lg:ml-[100px]'>
            <div className='md:block sm:hidden lg:block'>
              <img src="src/assets/main/section2/Rectangle 1772.png" className='absolute right-[-0.05px] w-[49.9%] z-[1]' />
              <img src="src/assets/main/section2/Ellipse 669.png" className="absolute z-[10] right-[-0.09px] mt-[50px] mr-[50px] w-[40%]" />
              <img src="src/assets/main/section2/Group 179936323.png" className="absolute z-[10] right-[-0.09px] mt-[50px] mr-[50px] w-[40%]" />
            </div>
            <div className='lg:px-[50px] lg:py-[50px] flex flex-col items-start gap-[30px] sm:py-[37px] sm:px-[40px]'>
              <div>
                <div className='flex items-center gap-[20px]'>
                  <h1 className='lg:text-[65px] sm:text-[38px] font-[700]'>{t("t24")}</h1>
                  <img src="src/assets/main/section2/image 1759.png" alt="" />
                </div>
                <p className='font-[700]'>{t("t25")}</p>
              </div>

              <div className='bg lg:w-[560px] md:w-[460px] p-[3px] flex items-center'>
                <button className='lg:w-[185px] md:w-[180px] py-[11px] px-[20px] bg-[#fff] rounded-[40px] text-[rgb(64,97,248)] font-[700]'>{t("t26")}</button>
                <button className='lg:w-[185px] md:w-[180px] py-[11px] px-[20px]  font-[700]'>{t("t27")}</button>
                <button className='lg:w-[185px] md:w-[180px] py-[11px] px-[20px] md:block sm:hidden lg:block font-[700]'>{t("t28")}</button>
              </div>


              <div className='flex items-start flex-col gap-[10px]'>
                <div className='flex items-center gap-[10px]'>
                  <img src="src/assets/main/section2/badge-check.png" alt="" />
                  <p>{t("t29")}</p>
                </div>

                <div className='flex items-center gap-[10px]'>
                  <img src="src/assets/main/section2/badge-check.png" alt="" />
                  <p>{t("t30")}</p>
                </div>

                <div className='flex items-center gap-[10px]'>
                  <img src="src/assets/main/section2/badge-check.png" alt="" />
                  <p>{t("t31")}</p>
                </div>
              </div>

              <p className='lg:w-[560px] md:w-[560px]'>{t("t32")}</p>

              <p className='font-[800]'>{t("t33")}
                <span className='text-[32px]'> 45 000 </span>
                <span>{t("t34")}
                  <span className='text-[32px]'> 10 <span className='text-[30px]'>{t("t35")}</span></span>
                </span>
              </p>
              <Button sx={{ background: "rgb(64, 97, 248)", textTransform: "none", color: "white", paddingTop: "15px", paddingBottom: "15px", paddingRight: "50px", paddingLeft: "50px", borderRadius: "30px" }}>{t("t36")}</Button>
            </div>

            <div className='d1 flex justify-center px-[10%] py-[50px] md:hidden sm:block lg:hidden'>
              <img src="src/assets/main/section2/Group 179936521.png" alt="" />
            </div>
          </section>

          {/* section 3 */}
          <section className='lg:py-[150px] lg:pl-[150px] sm:py-[40px] sm:pl-[24px]'>
            <main className='flex items-center justify-between sm:flex-wrap sm:gap-[50px]'>
              <aside className='flex flex-col items-start gap-[40px]'>
                <div>
                  <div className='lg:flex sm:hidden items-center gap-[20px]'>
                    <h1 className='lg:text-[65px] sm:text-[38px] font-[700]'>{t("t38")}</h1>
                    <img src="src/assets/main/section3/image 1761.png" alt="" />
                  </div>
                  <div className='sm:flex lg:hidden items-center gap-[5px] py-[40px]'>
                    <img src="src/assets/main/section4/Line 50.png" alt="" />
                    <p className='text-[12px] font-[700]'>{t("t52")}</p>
                  </div>
                  <p className='font-[700]'>{t("t39")}</p>
                </div>
                <div className='flex items-start flex-col gap-[10px]'>

                  <div className='flex items-center gap-[10px]'>
                    <img src="src/assets/main/section2/badge-check.png" alt="" />
                    <p>{t("t40")}</p>
                  </div>

                  <div className='flex items-center gap-[10px]'>
                    <img src="src/assets/main/section2/badge-check.png" alt="" />
                    <p>{t("t41")}</p>
                  </div>

                  <div className='flex items-center gap-[10px]'>
                    <img src="src/assets/main/section2/badge-check.png" alt="" />
                    <p>{t("t42")}</p>
                  </div>

                  <div className='flex items-center gap-[10px]'>
                    <img src="src/assets/main/section2/badge-check.png" alt="" />
                    <p>{t("t43")}</p>
                  </div>
                  <div className='flex items-center gap-[10px]'>
                    <img src="src/assets/main/section2/badge-check.png" alt="" />
                    <p>{t("t44")}</p>
                  </div>
                </div>

                <p className='lg:w-[586px]'>{t("t45")}</p>

                <p className='font-[800]'>{t("t33")}
                  <span className='text-[32px]'> 675 000 </span>
                  <span>{t("t34")}
                    <span className='text-[32px]'> 45 <span className='text-[30px]'>{t("t35")}</span></span>
                  </span>
                </p>
                <Button sx={{ background: "rgb(64, 97, 248)", textTransform: "none", color: "white", paddingTop: "15px", paddingBottom: "15px", paddingRight: "50px", paddingLeft: "50px", borderRadius: "30px" }}>{t("t36")}</Button>

              </aside>

              <aside>
                <img src="src/assets/main/section3/Group 179936978.png" />
              </aside>
            </main>
          </section>

          {/* section 4 */}
          <section className='v1 lg:ml-[100px]'>
            <main className='flex items-center justify-between sm:flex-wrap lg:flex-nowrap sm:gap-[50px] lg:px-[0] lg:pl-[80px] lg:pt-[0] sm:pt-[50px] sm:px-[24px]'>
              <aside className='flex flex-col items-start gap-[40px]'>
                <div>
                  <div className='flex items-center gap-[5px]'>
                    <h1 className='lg:text-[45px] sm:text-[38px] font-[700]'>{t("t46")}</h1>
                    <img src="src/assets/main/section4/image 203.png" alt="" />
                  </div>
                  <p className='font-[700]'>{t("t52")}</p>
                </div>
                <div className='flex items-start flex-col gap-[10px]'>

                  <div className='flex items-center gap-[10px]'>
                    <img src="src/assets/main/section2/badge-check.png" alt="" />
                    <p>{t("t48")}</p>
                  </div>

                  <div className='flex items-center gap-[10px]'>
                    <img src="src/assets/main/section2/badge-check.png" alt="" />
                    <p>{t("t49")}</p>
                  </div>

                  <div className='flex items-center gap-[10px]'>
                    <img src="src/assets/main/section2/badge-check.png" alt="" />
                    <p>{t("t50")}</p>
                  </div>

                  <div className='flex items-center gap-[10px]'>
                    <img src="src/assets/main/section2/badge-check.png" alt="" />
                    <p>{t("t51")}</p>
                  </div>
                </div>

                <p className='font-[800]'>{t("t33")}
                  <span className='text-[32px]'> 1 575 000 </span>
                  <span>{t("t34")}
                    <span className='text-[32px]'> 120 <span className='text-[30px]'>{t("t35")}</span></span>
                  </span>
                </p>
                <Button sx={{ background: "rgb(64, 97, 248)", textTransform: "none", color: "white", paddingTop: "15px", paddingBottom: "15px", paddingRight: "50px", paddingLeft: "50px", borderRadius: "30px" }}>{t("t36")}</Button>

              </aside>

              <aside className='lg:flex justify-end sm:hidden'>
                <img src="src/assets/main/section4/Group 179936984.png" className="w-[80%]" />
              </aside>
            </main>
            <div className='relative top-[154px]'>
              <img src="src/assets/main/section4/Group 179936988.png" className="lg:hidden sm:block w-[100%]" />
            </div>
          </section>


          {/* section 5 */}
          <section className='lg:py-[150px] lg:pl-[53px] flex items-start gap-[20px] sm:py-[80px] sm:px-[24px]'>

            <aside className='lg:flex sm:hidden items-start gap-[10px] mt-[99px] w-[359px]'>
              <span className='text-[#4061F8] font-[800]'>{t("t531")}</span>
              <div>
                <h1 className='text-[#4061F8] font-[700]'>{t("t53")}</h1>
                <h2 className='text-[#BDBFC8]'>{t("t54")}</h2>
                <h2 className='text-[#BDBFC8]'>{t("t55")}</h2>
              </div>
            </aside>

            {/* main */}
            <main className='lg:flex items-center justify-between gap-[30px] sm:py-[50px] lg:p-[0]'>

              {/* aside */}
              <aside className='flex flex-col items-start gap-[35px]'>
                <div>
                  <h1 className='lg:text-[65px] sm:text-[42px] font-[700]'>{t("t56")}</h1>
                  <p className='font-[700]'>{t('t57')}</p>
                </div>
                <div className='lg:w-[560px] flex items-start flex-col gap-[20px]'>
                  <p>{t("t58")}</p>
                  <p>{t("t59")}</p>
                  <p>{t("t60")}</p>
                  <p>{t("t61")}</p>
                </div>
                <div className='lg:w-[560px]'>
                  <img src="src/assets/main/section4/Line 52.png" alt="" />
                  <div className='flex items-center justify-between py-[15px]'>
                    <h1 className='font-[700]'>{t("t62")}</h1>
                    <img src="src/assets/main/section4/plus.png" className="bg-[#D7EFFE] rounded-[50%] p-[5px]" />
                  </div>
                  <img src="src/assets/main/section4/Line 52.png" alt="" />
                </div>
                <img src="src/assets/main/section4/Group 179935808.png" alt="" />
              </aside>
              <div className='flex justify-end items-end'>
                <img src="src/assets/main/section4/Group 179936623.png" className="lg:hidden sm:block" />
              </div>

              <img src="src/assets/main/section4/Group 179935832.png" className="lg:block sm:hidden" />


              {/* aside */}
              <aside className='lg:flex sm:hidden flex-col items-start gap-[35px] overflow-hidden text-[#D3D5DC]'>
                <div>
                  <h1 className='text-[48px] font-[700]'>{t("t63")}</h1>
                  <p className='font-[700]'>{t('t57')}</p>
                </div>
                <div className=' flex items-start flex-col gap-[20px]'>
                  <p>{t("t58")}</p>
                  <p>{t("t59")}</p>
                  <p>{t("t64")}</p>
                </div>
                <div className=''>
                  <img src="src/assets/main/section4/Line 54.png" />
                  <div className='flex items-center justify-between py-[15px]'>
                    <h1 className='font-[700]'>{t("t62")}</h1>
                  </div>
                  <img src="src/assets/main/section4/Line 54.png" />
                </div>
              </aside>
            </main>
          </section>


          {/* section 6 */}
          <section className='lg:py-[120px] lg:pl-[60px] sm:px-[24px]'>
            <div className='flex items-center gap-[20px] py-[20px]'>
              <h1 className='lg:text-[65px] sm:text-[32px] font-[800]'>{t("t65")}</h1>
              <img src="src/assets/main/section3/image 202.png" className="lg:block sm:hidden" />
            </div>

            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
              <SwiperSlide>
                <div className='lg:w-[596px] bg-[#F5EEEE] rounded-[80px] lg:pl-[56px] lg:py-[54px] sm:px-[24px] sm:py-[80px]'>
                  <Card2
                    btn={t("t66")}
                    h1={t("t67")}
                    p={t("t68")}
                    span={t("t69")}
                    t1={t("t70")}
                    t2={t("t71")}
                    t3={t("t72")}
                    t4={t("t73")}
                    t5={t("t74")}
                    t6={t("t75")}
                    t7={t("t76")}
                    t8={t("t77")}
                    t9={t("t78")}
                    t10={t("t79")}
                    t11={t("t80")}
                    str={"src/assets/main/card2/Group 1485 (1).png"}
                    img={"src/assets/main/card2/Eat repeat 2.png"}
                  /></div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='lg:w-[596px] bg-[#BFDFE6] rounded-[80px] lg:pl-[56px] lg:py-[54px] sm:px-[24px] sm:py-[80px]  sm:m-[24px] lg:m-[0]'>
                  <Card2
                    btn={t("t66")}
                    h1={t("t81")}
                    p={t("t68")}
                    span={t("t69")}
                    t1={t("t70")}
                    t2={t("t71")}
                    t3={t("t72")}
                    t4={t("t73")}
                    t5={t("t74")}
                    t6={t("t75")}
                    t7={t("t76")}
                    t8={t("t77")}
                    t9={t("t78")}
                    t10={t("t79")}
                    t11={t("t80")}
                    str={"src/assets/main/card2/Group 1485 (1).png"}
                    img={"src/assets/main/card2/ibibook 1.png"}
                  /></div>
              </SwiperSlide>
              <SwiperSlide>
                <div className=' lg:w-[596px] bg-[#E8EBE0] rounded-[80px] lg:pl-[56px] lg:py-[54px] sm:px-[24px] sm:py-[80px]  sm:m-[24px] lg:m-[0]'>
                  <Card2
                    btn={t("t66")}
                    h1={t("t81")}
                    p={t("t68")}
                    span={t("t69")}
                    t1={t("t70")}
                    t2={t("t71")}
                    t3={t("t72")}
                    t4={t("t73")}
                    t5={t("t74")}
                    t6={t("t75")}
                    t7={t("t76")}
                    t8={t("t77")}
                    t9={t("t78")}
                    t10={t("t79")}
                    t11={t("t80")}
                    str={"src/assets/main/card2/Group 1485 (1).png"}
                    img={"src/assets/main/card2/ibibook 1.png"}
                  /></div>
              </SwiperSlide>
              <SwiperSlide>
                <div className=' lg:w-[596px] bg-[#3fd565] rounded-[80px] lg:pl-[56px] lg:py-[54px] sm:px-[24px] sm:py-[80px]  sm:m-[24px] lg:m-[0]'>
                  <Card2
                    btn={t("t66")}
                    h1={t("t81")}
                    p={t("t68")}
                    span={t("t69")}
                    t1={t("t70")}
                    t2={t("t71")}
                    t3={t("t72")}
                    t4={t("t73")}
                    t5={t("t74")}
                    t6={t("t75")}
                    t7={t("t76")}
                    t8={t("t77")}
                    t9={t("t78")}
                    t10={t("t79")}
                    t11={t("t80")}
                    str={"src/assets/main/card2/Group 1485 (1).png"}
                    img={"src/assets/main/card2/ibibook 1.png"}
                  /></div>
              </SwiperSlide>
            </Swiper>

            <img src="src/assets/main/section2/Group 179936243.png" className="lg:block sm:hidden" />
          </section>


          {/* section 7 */}
          <section className='lg:py-[60px] lg:px-[180px] sm:px-[24px] sm:py-[80px]'>
            <div className='flex items-center gap-[20px]'>
              <h1 className='lg:text-[65px] sm:text-[24px] font-[800]'>{t("t82")}</h1>
              <img src="src/assets/main/section4/Mask Group (12).png" className="lg:block sm:hidden" />
            </div>

            <main className='flex items-center sm:flex-wrap justify-between lg:py-[60px] sm:py-[40px]'>
              <aside className='flex flex-col gap-[20px]'>
                <Btn1 btn={"00."} h1={t("t83")} />
                <Btn1 btn={"01."} h1={t("t84")} />
                <Btn1 btn={"02."} h1={t("t85")} />
                <Btn1 btn={"03."} h1={t("t86")} />
                <Btn1 btn={"04."} h1={t("t87")} />
                <Btn1 btn={"05."} h1={t("t88")} />
                <Btn1 btn={"06."} h1={t("t89")} />
                <Btn1 btn={"07."} h1={t("t90")} />
                <div className='py-[20px]'>
                  <Button sx={{ background: "rgb(64, 97, 248)", textTransform: "none", color: "white", paddingTop: "15px", paddingBottom: "15px", paddingRight: "50px", paddingLeft: "50px", borderRadius: "30px" }}>{t("t92")}</Button>
                </div>
              </aside>

              <aside className='flex flex-col items-start gap-[20px]'>
                <img src="src/assets/main/section7/Снимок экрана 2024-01-08 114725.png" alt="" />
                <p className='lg:w-[700px] text-[12px]'>{t("t91")}</p>
              </aside>
            </main>
          </section>


          {/* section 8 TODO  */}
          <section className='lg:py-[80px] lg:px-[180px] sm:px-[24px] sm:pb-[50px]'>
            <h1 className='text-center lg:text-[72px] sm:text-[42px] font-[700]'>{t("t100")}</h1>
            <button
              className="bg-[hsl(161,45%,30%)] py-[5px] px-[15px] rounded-[5px] mx-[40px] my-[40px] text-white mb-[20px]"
              onClick={() => {
                handleClickOpenAdd();
              }}
            >
              Add
            </button>
            <div className='flex items-center flex-wrap gap-[40px] lg:pb-[50px]'>
              {
                todo.map((e) => {
                  return (
                    <div className='bg-[#E6F7FE] w-[350px] rounded-[60px] px-[50px] py-[50px] flex flex-col items-start gap-[20px]'>
                      <div className='flex items-center gap-[10px]'>
                        <img src={e.file} className="w-[50px] h-[50px] rounded-[50%]" />
                        <div>
                          <h1>{e.name}</h1>
                          <p>{e.email}</p>
                        </div>
                      </div>
                      <div className='flex items-center gap-[20px]'>
                        <button className='bg-[#f97c3e] px-[20px] py-[5px] rounded-[50px] text-[white]' onClick={() => deleteUser(e.id)}>Delete</button>
                        <button className='bg-[#2b9f9f] px-[20px] py-[5px] rounded-[50px] text-[white]' onClick={() => {
                          handleClickOpen();
                          setIdx(e.id);
                          setEditName(e.name);
                          setBase64F(e.file);
                          setEditEmail(e.email);
                        }}
                        >Edit</button>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </section>

        </main >


        {/* footer */}
        <footer className='lg:px-[120px] lg:py-[80px]'>
          <div className='flex justify-end'>
            <img src="src/assets/footer/Group 179936208.png" alt="" />
          </div>

          <div className='bg-[#EAF0F6] lg:rounded-[80px] sm:rounded-[80px] sm:rounded-b-none'>
            <div className='flex items-center sm:gap-[40px] lg:flex-nowrap lg:gap-[0] justify-between sm:flex-wrap lg:py-[70px] lg:px-[80px] sm:px-[24px] sm:py-[40px]'>
              {/* left */}
              <aside className='flex flex-col items-start gap-[30px]'>
                <div className='flex items-end gap-[10px]'>
                  <h1 className='text-[42px] font-[700]'>{t("t93")}</h1>
                  <img src="src/assets/footer/image 1788.png" alt="" />
                </div>
                <div className='flex flex-col gap-[10px]'>
                  <p className='font-[700]'>8 (800) 707-23-60</p>
                  <p className='font-[700]'>hello@appsstudio.ru</p>
                </div>

                <div className='flex items-center gap-[20px]'>
                  <div>
                    <div className='flex items-center gap-[5px]'>
                      <img src="src/assets/footer/Group 179936349.png" alt="" />
                      <p className='font-[700]'>Telegram</p>
                    </div>
                    <div className='flex items-center gap-[5px]'>
                      <img src="src/assets/footer/Group 862.png" alt="" />
                      <p className='font-[700]'>Instagram</p>
                    </div>
                  </div>

                  <div>
                    <div className='flex items-center gap-[5px]'>
                      <img src="src/assets/footer/Group 179936348.png" alt="" />
                      <p className='font-[700]'>WhatsApp</p>
                    </div>
                    <div className='flex items-center gap-[5px]'>
                      <img src="src/assets/footer/Group 179936349.png" alt="" />
                      <p className='font-[700]'>Behance</p>
                    </div>
                  </div>
                </div>

                <div className='lg:flex  sm:hidden items-start flex-col gap-[10px]'>
                  <p className='font-[700]'>Россия</p>
                  <img src="src/assets/footer/Line 31.png" alt="" />
                  <p className='font-[700]'>© ООО “АППсСтудио”, 2013 - ∞  </p>
                </div>
              </aside>

              {/* right */}
              <aside>
                <div className='bg-[#fff] lg:pb-[52px] sm:pb-[40px] rounded-[60px]  lg:px-[126px] sm:px-[24px]'>
                  <h1 className='text-center text-[28px] font-[700] py-[52px]'>{t("t94")}</h1>
                  <main className='flex flex-col gap-[40px]'>
                    <div className='flex flex-col gap-[10px] items-start'>
                      <h1>{t("t95")}</h1>
                      <hr className='border-[1px] border-[#50505099]  w-[100%]'></hr>
                    </div>

                    <div className='flex flex-col gap-[10px] items-start'>
                      <h1>{t("t96")}</h1>
                      <hr className='border-[1px] border-[#50505099]  w-[100%]'></hr>
                    </div>

                    <div className='flex flex-col gap-[10px] items-start'>
                      <h1>{t("t97")}</h1>
                      <hr className='border-[1px] border-[#50505099] w-[100%] mt-[40px]'></hr>
                    </div>
                    <div className='flex items-center gap-[40px] sm:flex-wrap'>
                      <div className='flex items-center gap-[10px]'>
                        <img src="src/assets/header/Group 179936192.png" alt="" />
                        <h1>{t("t98")}</h1>
                      </div>
                      <Button sx={{ background: "rgb(64, 97, 248)", textTransform: "none", color: "white", paddingTop: "15px", paddingBottom: "15px", paddingRight: "50px", paddingLeft: "50px", borderRadius: "30px" }}>{t("t99")}</Button>
                    </div>
                  </main>
                </div>
              </aside>
              <div className='sm:flex lg:hidden items-start flex-col gap-[10px] sm:px-[40px] sm:py-[40px]'>
                <p className='font-[700]'>Россия</p>
                <img src="src/assets/footer/Line 31.png" alt="" />
                <p className='font-[700]'>© ООО “АППсСтудио”, 2013 - ∞  </p>
              </div>
            </div>

            <div className='lg:hidden sm:flex'>
              <div>
                <div className='bg-[#fff] rounded-t-[20px]  py-[20px] px-[15px]'>
                  <h1 style={gradientText} className='font-[700]'>Маркетплейс</h1>
                </div>
                <img src="src/assets/header/Rectangle 1982.png" className="w-[100%]" />
              </div>
              <div>
                <div className='bg-[#fff] rounded-t-[20px]  py-[20px] px-[15px]'>
                  <h1 style={gradientText} className='font-[700]'>Интернет-</h1>
                </div>
                <img src="src/assets/header/Rectangle 1981.png" className="w-[100%]" />
              </div>
              <div>
                <div className='bg-[#fff] rounded-t-[20px]  py-[20px] px-[15px]'>
                  <h1 className='text-[#4061F8] font-[700]'>Искусственный </h1>
                </div>
                <img src="src/assets/header/Rectangle 1982.png" className="w-[100%]" />
              </div>
              <div></div>
              <div></div>
            </div>
          </div>
        </footer >



        {/* //modal */}
        {/* //modal Edit*/}
        <React.Fragment>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Edit User"}</DialogTitle>
            <DialogContent>
              <DialogContentText
                sx={{ display: "flex", flexDirection: "column", gap: "30px" }}
                id="alert-dialog-description"
              >
                <TextField
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                ></TextField>
                <TextField
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                ></TextField>
                <FileBase64 multiple={false} onDone={handleImg} />
                <img src={base64F} className="rounded-[50%] w-[50px] h-[50px]" />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Concel</Button>
              <Button
                onClick={() => {
                  let obj = {
                    name: editName,
                    email: editEmail,
                    file: base64F,
                  };
                  editUser(idx, obj);
                  handleClose();
                }}
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>

        {/* modal add */}
        <React.Fragment>
          <Dialog
            open={openAdd}
            onClose={handleCloseAdd}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Add User"}</DialogTitle>
            <DialogContent>
              <DialogContentText
                sx={{ display: "flex", flexDirection: "column", gap: "30px" }}
                id="alert-dialog-description"
              >
                <TextField
                  value={addName}
                  onChange={(e) => setAddName(e.target.value)}
                ></TextField>
                <TextField
                  value={addEmail}
                  onChange={(e) => setAddEmail(e.target.value)}
                ></TextField>
                <FileBase64 multiple={false} onDone={handleImg1} />
                <img src={base64F1} className="rounded-[50%] w-[50px] h-[50px]" />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseAdd}>Concel</Button>
              <Button
                onClick={() => {
                  let user = {
                    name: addName,
                    email: addEmail,
                    file: base64F1,
                  };
                  setAddName("");
                  setAddEmail("");
                  addUser(user);
                  handleCloseAdd();
                }}
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      </ThemeProvider>
    </>

  )
}

export default App
