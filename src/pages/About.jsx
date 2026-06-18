import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="page-container">
      <motion.div
        className="content-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="page-title">เกี่ยวกับเรา</h1>
        <div className="divider"></div>
        <div className="card-body">
          <p>
            ยินดีต้อนรับสู่ <strong>AgeCalc</strong>{" "}
            เครื่องมือคำนวณอายุออนไลน์ที่ใช้งานง่าย สะดวก และแม่นยำที่สุด!
          </p>
          <p>
            โปรเจกต์นี้เกิดขึ้นจากความตั้งใจที่จะพัฒนาเว็บเครื่องมือคำนวณอายุที่เรียบง่าย
            แต่มีประสิทธิภาพสูง โดยเน้นการคำนวณที่แม่นยำตามระบบปฏิทินจริง
          </p>
          <h2 className="section-title">จุดเด่นของเรา</h2>
          <ul className="feature-list">
            <li>
              <strong>คำนวณแม่นยำ:</strong>{" "}
              ระบบรองรับและคำนวณวันของเดือนกุมภาพันธ์ในปีอธิกสุรทิน (Leap Year)
              อย่างรอบคอบ
            </li>
            <li>
              <strong>เป็นส่วนตัว 100%:</strong>{" "}
              การคำนวณทั้งหมดทำผ่านเบราว์เซอร์ของคุณโดยตรง
              ไม่มีการส่งข้อมูลกลับไปยังเซิร์ฟเวอร์
            </li>
            <li>
              <strong>ใช้งานฟรี:</strong>{" "}
              เราเปิดให้ใช้งานได้ฟรีโดยไม่มีข้อจำกัดใด ๆ
            </li>
          </ul>
          <p>
            หวังว่าเครื่องมือชิ้นนี้จะมีประโยชน์ต่อการทำงานหรือการใช้งานในชีวิตประจำวันของทุกท่าน
          </p>
        </div>
      </motion.div>
    </div>
  );
}
