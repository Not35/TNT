// วาง API URL ที่ได้จาก Step 3 ตรงนี้
const API_URL = "https://script.google.com/macros/s/AKfycbzYgyeYlmjl0d5HUxZ6UeBsOZELDkViAj5yWsOG1vp1Ipe1xo8CEBbU-b7JrKHMzTn-Zw/exec";

// ----------------------------------------------------
// ฟังก์ชันกลางสำหรับส่งข้อมูล POST แบบข้ามติด CORS (Form Data)
// ----------------------------------------------------
async function sendPostRequest(actionName, payloadData) {
  const formData = new URLSearchParams();
  formData.append('action', actionName);
  formData.append('payload', JSON.stringify(payloadData));

  const response = await fetch(API_URL, {
    method: "POST",
    body: formData
  });
  return await response.json();
}

// ----------------------------------------------------
// ฟังก์ชันสำหรับดึงและบันทึกข้อมูล
// ----------------------------------------------------

// 1. ดึงรายการของวันนี้
async function fetchTodayTransactions() {
  const response = await fetch(`${API_URL}?action=getToday`);
  const data = await response.json();
  console.log("รายการวันนี้:", data);
  return data;
}

// 2. บันทึกรายการใหม่ (แก้ไขวิธีส่งข้อมูลเป็น Form Data)
async function addTransaction(type, category, amount, note) {
  const payload = {
    date: new Date().toISOString().split('T')[0],
    type,
    category,
    amount: parseFloat(amount),
    note
  };

  const result = await sendPostRequest("addTransaction", payload);
  console.log("ผลการบันทึก:", result);
  return result;
}

// 3. ดึงรายการเช็คที่ครบกำหนด (สำหรับป๊อปอัปกระดิ่งแจ้งเตือน)
async function fetchDueSchedules() {
  const response = await fetch(`${API_URL}?action=getDueSchedules`);
  const data = await response.json();
  console.log("เช็คที่ครบกำหนด:", data);
  return data;
}

// 4. บันทึกเช็ค / รายการล่วงหน้าลงปฏิทิน (แก้ไขวิธีส่งข้อมูลเป็น Form Data)
async function addSchedule(dueDate, company, chequeNo, amount, note) {
  const payload = {
    dueDate,
    company,
    chequeNo,
    amount: parseFloat(amount),
    note
  };

  const result = await sendPostRequest("addSchedule", payload);
  console.log("ผลบันทึกล่วงหน้า:", result);
  return result;
}

// 5. ดึงข้อมูลรายการล่วงหน้าทั้งหมด (สำหรับแสดงบนปฏิทิน)
async function fetchAllSchedules() {
  const response = await fetch(`${API_URL}?action=getAllSchedules`);
  const data = await response.json();
  console.log("รายการล่วงหน้าทั้งหมด:", data);
  return data;
}

// 6. ยืนยันการชำระเงินเช็ค/ผ่อนจ่าย (ย้ายเข้า Transactions และปรับสถานะ)
async function completeSchedule(scheduleItem) {
  const result = await sendPostRequest("completeSchedule", scheduleItem);
  console.log("ผลการชำระเรียบร้อย:", result);
  return result;
}

// 7. เลื่อนวันผ่อนจ่าย
async function rescheduleSchedule(rowIndex, newDate) {
  const payload = { rowIndex, newDate };
  const result = await sendPostRequest("reschedule", payload);
  console.log("ผลการเลื่อนวัน:", result);
  return result;
}

// 8. ดึงข้อมูลประวัติย้อนหลังตามช่วงวันที่
async function fetchHistory(startDate, endDate) {
  const response = await fetch(`${API_URL}?action=getHistory&start=${startDate}&end=${endDate}`);
  const data = await response.json();
  console.log("ประวัติย้อนหลัง:", data);
  return data;
}
