import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AgeCalculator from '../AgeCalculator';

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: "การนับอายุแบบไทยกับแบบสากลต่างกันอย่างไร?",
      answer: "การนับอายุแบบสากลจะนับอายุเต็มปีเมื่อครบรอบวันเกิดในแต่ละปี (เช่น เกิด 1 ม.ค. 2560 จะอายุครบ 7 ปีเต็มในวันที่ 1 ม.ค. 2567) ในขณะที่การนับอายุตามแบบไทยดั้งเดิม (หรือทางราชการ/กฎหมายในบางกรณี) มักจะนับปีที่เกิดเป็นปีที่ 1 ทันที หรือเริ่มนับปีถัดไปตามการเปลี่ยนปีปฏิทินหรือปีนักษัตร ทำให้ในทางปฏิบัติอายุแบบไทยอาจมากกว่าแบบสากลอยู่ประมาณ 1 ปี"
    },
    {
      question: "ปีอธิกสุรทิน (Leap Year) มีผลกับการคำนวณอายุอย่างไร?",
      answer: "ปีอธิกสุรทินคือปีที่มี 366 วัน (ปีที่เดือนกุมภาพันธ์มี 29 วัน เช่น ค.ศ. 2020, 2024) ระบบคำนวณนี้จะใช้ฟังก์ชันวันที่ของเบราว์เซอร์ (JavaScript Date) ซึ่งจัดการปีอธิกสุรทินโดยอัตโนมัติ ทำให้มั่นใจได้ว่าความต่างของวันและเดือนจะถูกคำนวณอย่างถูกต้องแม่นยำ ไม่ว่าคุณจะเกิดในปีอธิกสุรทินหรือไม่ก็ตาม"
    },
    {
      question: "ทำไมอายุที่คำนวณได้บางครั้งจึงไม่ตรงกับที่คาดไว้?",
      answer: "โดยทั่วไปมีสาเหตุมาจาก 2 ปัจจัยหลัก: 1) ความต่างระหว่างเขตเวลา (Timezone) ของอุปกรณ์ที่ใช้เปิดเว็บ หรือ 2) การนับจำนวนวันในแต่ละเดือนที่ไม่เท่ากัน (เช่น 30 หรือ 31 วัน และ 28 หรือ 29 วันในเดือนกุมภาพันธ์) ระบบของเราคำนวณเศษของวันโดยอิงจากจำนวนวันจริงของเดือนนั้น ๆ ซึ่งมีความแม่นยำทางปฏิทิน 100%"
    },
    {
      question: "เครื่องมือนี้มีการเก็บข้อมูลวันเกิดที่ฉันกรอกไว้หรือไม่?",
      answer: "ไม่มีการเก็บข้อมูลใด ๆ ทั้งสิ้น! การคำนวณทั้งหมดเกิดขึ้นบนเบราว์เซอร์ของคุณ (Client-side) ผ่าน JavaScript ข้อมูลวันเกิดของคุณจะไม่ถูกส่งไปยังเซิร์ฟเวอร์หรือจัดเก็บไว้ในฐานข้อมูลใด ๆ คุณจึงมั่นใจในความเป็นส่วนตัวและความปลอดภัยของข้อมูลได้ 100%"
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="home-container">
      {/* Age Calculator Component */}
      <div className="calculator-section">
        <AgeCalculator />
      </div>

      {/* How it works section */}
      <section className="info-section">
        <div className="info-card">
          <h2 className="info-title">ระบบนี้คำนวณอายุอย่างไร?</h2>
          <p className="info-text">
            เครื่องมือคำนวณอายุของเราทำงานโดยใช้ระบบประมวลผลบนเบราว์เซอร์ของท่าน 
            โดยการนำวัน เดือน ปี เกิดที่คุณป้อน ไปเปรียบเทียบกับวันที่ปัจจุบันของระบบแบบวินาทีต่อวินาที 
            ตัวระบบจะคำนวณหาส่วนต่างของปี เดือน และวันอย่างแม่นยำ 
            โดยคำนึงถึงจำนวนวันจริงในแต่ละเดือนรวมถึงปีอธิกสุรทิน (ปีที่เดือนกุมภาพันธ์มี 29 วัน) เพื่อให้ได้ผลลัพธ์ที่ถูกต้องที่สุด
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <h2 className="faq-main-title">คำถามที่พบบ่อย (FAQ)</h2>
        <div className="faq-list">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div 
                key={index} 
                className={`faq-item ${isOpen ? 'active' : ''}`}
                onClick={() => toggleFaq(index)}
              >
                <button className="faq-question">
                  <span>{faq.question}</span>
                  <span className="faq-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {isOpen ? (
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      ) : (
                        <>
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </>
                      )}
                    </svg>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="faq-answer-wrapper"
                    >
                      <div className="faq-answer">
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
