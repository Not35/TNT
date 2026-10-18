// วาง API URL ที่ได้จาก Step 3 ตรงนี้
const API_URL = "https://script.google.com/macros/s/AKfycbzYgyeYlmjl0d5HUxZ6UeBsOZELDkViAj5yWsOG1vp1Ipe1xo8CEBbU-b7JrKHMzTn-Zw/exec";

// 1. ดึงรายการของวันนี้
async function fetchTodayTransactions() {
  const response = await fetch(`${API_URL}?action=getToday`);
  const data = await response.json();
  console.log("รายการวันนี้:", data);
  return data;
}

// 2. บันทึกรายการใหม่
async function addTransaction(type, category, amount, note) {
  const payload = {
    action: "addTransaction",
    payload: { type, category, amount, note }
  };

  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(payload)
  });
  
  const result = await response.json();
  console.log("ผลการบันทึก:", result);
}

// 3. ดึงรายการเช็คที่ครบกำหนด (สำหรับป๊อปอัปกระดิ่งแจ้งเตือน)
async function fetchDueSchedules() {
  const response = await fetch(`${API_URL}?action=getDueSchedules`);
  const data = await response.json();
  console.log("เช็คที่ครบกำหนด:", data);
  return data;
}

// 4. บันทึกเช็ค / รายการล่วงหน้าลงปฏิทิน
async function addSchedule(dueDate, company, chequeNo, amount, note) {
  const payload = {
    action: "addSchedule",
    payload: { dueDate, company, chequeNo, amount, note }
  };

  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(payload)
  });

  const result = await response.json();
  console.log("ผลบันทึกล่วงหน้า:", result);
}

// 5. ดึงข้อมูลประวัติย้อนหลังตามช่วงวันที่
async function fetchHistory(startDate, endDate) {
  const response = await fetch(`${API_URL}?action=getHistory&start=${startDate}&end=${endDate}`);
  const data = await response.json();
  console.log("ประวัติย้อนหลัง:", data);
  return data;
}
