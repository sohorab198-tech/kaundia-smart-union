// 🔄 ১. মোবাইল হ্যামবার্গার সাইডবার টগল করার লজিক
function toggleSidebar() {
    const sidebar = document.getElementById('sidebarPanel');
    const overlay = document.getElementById('sidebarOverlay');
    
    sidebar.classList.toggle('open');
    overlay.classList.toggle('show');
}

// 🔄 ২. ১১টি ডাইনামিক মেনু পরিবর্তন করার ফাংশন (সেকশন সুইচ)
function switchSection(sectionId, element) {
    // সব সেকশন হাইড করা
    const sections = document.querySelectorAll('.dashboard-section');
    sections.forEach(sec => sec.classList.remove('active-section'));

    // নির্দিষ্ট সেকশন অ্যাক্টিভ করা
    const activeSec = document.getElementById(`section-${sectionId}`);
    if (activeSec) activeSec.classList.add('active-section');

    // সাইডবার মেনু হাইলাইট ঠিক করা
    const menuItems = document.querySelectorAll('.sidebar-menu li');
    menuItems.forEach(item => item.classList.remove('active'));
    element.classList.add('active');

    // মোবাইলে ক্লিক করার পর সাইডবার স্বয়ংক্রিয়ভাবে বন্ধ হওয়া
    if(window.innerWidth <= 768) {
        toggleSidebar();
    }
}

// পেজ লোড হওয়ার সময় সেশন ডাটা চেক এবং সেট করা
document.addEventListener("DOMContentLoaded", function() {
    const sessionDataRaw = localStorage.getItem('user_dashboard_session');
    if (sessionDataRaw) {
        const sessionData = JSON.parse(sessionDataRaw);
        if(sessionData.schoolName) {
            document.getElementById('sidebarInstName').innerText = sessionData.schoolName;
            document.getElementById('headerInstBadge').innerText = sessionData.schoolName;
        }
        if(sessionData.studentName) {
            document.getElementById('welcomeUser').innerText = `স্বাগতম, ${sessionData.studentName}`;
        }
    }
    setTodayDateInNotice();
    renderTeacherNoticeList();
    renderSavedPlansList();
});

// 🚪 লগআউট হ্যান্ডলার ফাংশন
function handleLogout() {
    if (confirm("আপনি কি নিশ্চিতভাবে ড্যাশবোর্ড থেকে লগআউট করতে চান?")) {
        localStorage.removeItem('user_dashboard_session');
        alert("সফলভাবে লগআউট হয়েছে।");
        window.location.href = 'institutions.html';
    }
}

// 📅 ৩. শনিবারের উপর ভিত্তি করে অটো তারিখ বসানোর ফাংশন
function updateTableDates() {
    const startDateVal = document.getElementById('weekStartDate').value;
    if(!startDateVal) return;

    const days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
    let baseDate = new Date(startDateVal);

    days.forEach((day, index) => {
        let currentDayDate = new Date(baseDate);
        currentDayDate.setDate(baseDate.getDate() + index);
        
        let d = String(currentDayDate.getDate()).padStart(2, '0');
        let m = String(currentDayDate.getMonth() + 1).padStart(2, '0');
        let y = currentDayDate.getFullYear();
        
        const dateLabel = document.getElementById(`date-${day}`);
        if(dateLabel) dateLabel.innerText = `${d}/${m}/${y}`;
    });
}

// ➕ ৪. নতুন ক্লাস কলাম যুক্ত করার ফাংশন
function addNewClassColumn() {
    const className = document.getElementById('planClassSelect').value;
    const subjectName = document.getElementById('planSubjectSelect').value;
    const table = document.getElementById('masterLessonTable');
    
    const existingHeaders = table.querySelectorAll('thead th');
    let isExist = false;
    existingHeaders.forEach(th => {
        if(th.getAttribute('data-class') === className && th.getAttribute('data-subject') === subjectName) {
            isExist = true;
        }
    });
    
    if(isExist) {
        alert("এই কলামটি ইতিমধ্যে যুক্ত আছে!");
        return;
    }

    const theadRow = table.querySelector('thead tr');
    const newTh = document.createElement('th');
    newTh.setAttribute('data-class', className);
    newTh.setAttribute('data-subject', subjectName);
    newTh.innerText = `${className} - ${subjectName}`;
    theadRow.appendChild(newTh);

    const tbodyRows = table.querySelectorAll('tbody tr');
    tbodyRows.forEach(row => {
        const newTd = document.createElement('td');
        newTd.innerHTML = `<textarea placeholder="অধ্যায়, পৃষ্ঠা..."></textarea>`;
        row.appendChild(newTd);
    });
}

// 💾 ৫. লোকাল স্টোরেজে ইউনিক তারিখ চাবিতে লেসন প্ল্যান সেভ করার ফাংশন
function saveWeeklyLessonPlan() {
    const dateInput = document.getElementById('weekStartDate').value;
    if(!dateInput) {
        alert("দয়া করে প্রথমে সপ্তাহের শুরুর (শনিবারের) তারিখটি সিলেক্ট করুন!");
        return;
    }

    const table = document.getElementById('masterLessonTable');
    const headers = table.querySelectorAll('thead th');
    const rows = table.querySelectorAll('tbody tr');
    
    let columnsStructure = [];
    for(let i = 1; i < headers.length; i++) {
        columnsStructure.push({
            class: headers[i].getAttribute('data-class'),
            subject: headers[i].getAttribute('data-subject')
        });
    }

    let gridData = {};
    rows.forEach(row => {
        const dayName = row.getAttribute('data-day');
        gridData[dayName] = [];
        const textareas = row.querySelectorAll('textarea');
        textareas.forEach(textarea => gridData[dayName].push(textarea.value));
    });

    let fullWeekSheet = {
        startDate: dateInput,
        columns: columnsStructure,
        grid: gridData
    };

    let allSavedSheets = JSON.parse(localStorage.getItem('all_school_lesson_plans')) || {};
    allSavedSheets[dateInput] = fullWeekSheet;

    localStorage.setItem('all_school_lesson_plans', JSON.stringify(allSavedSheets));
    alert("🎉 লেসন প্ল্যানটি সফলভাবে ডাটাবেজে সংরক্ষিত হয়েছে!");
    renderSavedPlansList();
}

// 📋6. সংরক্ষিত লেসন প্ল্যান এর তালিকা দেখানো
function renderSavedPlansList() {
    const logBody = document.getElementById('savedPlansLog');
    if(!logBody) return;
    logBody.innerHTML = '';

    const allSavedSheets = JSON.parse(localStorage.getItem('all_school_lesson_plans')) || {};
    const dates = Object.keys(allSavedSheets);

    if(dates.length === 0) {
        logBody.innerHTML = `<tr><td colspan="3" style="text-align:center; color:#94a3b8;">এখনো কোনো লেসন প্ল্যান সেভ করা হয়নি।</td></tr>`;
        return;
    }

    dates.forEach(date => {
        const sheet = allSavedSheets[date];
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td style="font-weight:600; color:var(--primary-color);">${sheet.startDate} (শনিবার)</td>
            <td>${sheet.columns.length} টি ক্লাস কলাম</td>
            <td>
                <button class="action-btn btn-load" onclick="loadSpecificPlan('${date}')"><i class="fa-solid fa-folder-open"></i> লোড/এডিট</button>
                <button class="action-btn btn-delete" onclick="deleteSpecificPlan('${date}')"><i class="fa-solid fa-trash"></i> মুছুন</button>
            </td>
        `;
        logBody.appendChild(tr);
    });
}

// 🔄 ৭. তালিকা থেকে পুরনো ডাটা টেবিলে লোড করা
function loadSpecificPlan(dateKey) {
    const allSavedSheets = JSON.parse(localStorage.getItem('all_school_lesson_plans')) || {};
    const sheet = allSavedSheets[dateKey];
    if(!sheet) return;

    document.getElementById('weekStartDate').value = sheet.startDate;
    updateTableDates();

    const table = document.getElementById('masterLessonTable');
    const theadRow = table.querySelector('thead tr');
    theadRow.innerHTML = `<th style="min-width: 120px;">বার ও তারিখ</th>`;
    
    sheet.columns.forEach(col => {
        const newTh = document.createElement('th');
        newTh.setAttribute('data-class', col.class);
        newTh.setAttribute('data-subject', col.subject);
        newTh.innerText = `${col.class} - ${col.subject}`;
        theadRow.appendChild(newTh);
    });

    const tbodyRows = table.querySelectorAll('tbody tr');
    tbodyRows.forEach(row => {
        const dayName = row.getAttribute('data-day');
        const dayContents = sheet.grid[dayName] || [];
        
        const cells = row.querySelectorAll('td');
        for(let i = 1; i < cells.length; i++) cells[i].remove();

        sheet.columns.forEach((col, index) => {
            const newTd = document.createElement('td');
            const textVal = dayContents[index] || '';
            newTd.innerHTML = `<textarea placeholder="অধ্যায়, পৃষ্ঠা...">${textVal}</textarea>`;
            row.appendChild(newTd);
        });
    });
    alert("📂 সিলেক্ট করা সপ্তাহের লেসন প্ল্যানটি সফলভাবে ছকে লোড হয়েছে। এখন আপনি এটি এডিট করতে পারেন।");
}

// 🗑️ ৮. লেসন প্ল্যান ডিলিট করা
function deleteSpecificPlan(dateKey) {
    if(confirm("আপনি কি নিশ্চিতভাবে এই সপ্তাহের লেসন প্ল্যানটি ডিলিট করতে চান?")) {
        let allSavedSheets = JSON.parse(localStorage.getItem('all_school_lesson_plans')) || {};
        delete allSavedSheets[dateKey];
        localStorage.setItem('all_school_lesson_plans', JSON.stringify(allSavedSheets));
        renderSavedPlansList();
    }
}

// 📢 ৯. নোটিশ ফর্মে আজকের তারিখ সেট করা
function setTodayDateInNotice() {
    const dateInput = document.getElementById('noticeDate');
    if(dateInput) {
        const today = new Date();
        const y = today.getFullYear();
        const m = String(today.getMonth() + 1).padStart(2, '0');
        const d = String(today.getDate()).padStart(2, '0');
        dateInput.value = `${y}-${m}-${d}`;
    }
}

// 🔑 সাহায্যকারী ফাংশন: স্কুলের বাংলা নাম থেকে ইউনিক ইংরেজি schoolId তৈরি করা
function generateSchoolId(schoolName) {
    if (!schoolName) return 'unknown_institution';
    if (schoolName.includes('সরকারি প্রাথমিক')) return 'kaundia_primary';
    if (schoolName.includes('মডেল হাই স্কুল')) return 'kaundia_model_high';
    if (schoolName.includes('শহীদ স্মৃতি')) return 'kaundia_shahid_smriti';
    if (schoolName.includes('দারুল উলুম')) return 'darul_ulum_madrasah';
    return 'general_institution';
}

// 🚀 ১০. স্কুলভিত্তিক ডাটা আইসোলেশনসহ নতুন নোটিশ প্রকাশ
function publishNewNotice() {
    const title = document.getElementById('noticeTitle').value.trim();
    const date = document.getElementById('noticeDate').value;
    const desc = document.getElementById('noticeDescription').value.trim();

    if(!title || !date || !desc) {
        alert("দয়া করে নোটিশের শিরোনাম, তারিখ এবং বিবরণ সম্পূর্ণ পূরণ করুন!");
        return;
    }

    // সেশন থেকে লগইন করা স্কুলের নাম নেওয়া (ডিফল্ট: কাউন্দিয়া মডেল হাই স্কুল)
    let currentSchoolName = "কাউন্দিয়া মডেল হাই স্কুল";
    const sessionDataRaw = localStorage.getItem('user_dashboard_session');
    if (sessionDataRaw) {
        const sessionData = JSON.parse(sessionDataRaw);
        if (sessionData.schoolName) {
            currentSchoolName = sessionData.schoolName;
        }
    }

    // স্কুলের নামের ওপর ভিত্তি করে ইউনিক আইডি তৈরি
    const currentSchoolId = generateSchoolId(currentSchoolName);

    const noticeId = 'notice_' + Date.now();
    const newNotice = { 
        id: noticeId, 
        schoolId: currentSchoolId,       // ডাটা আইসোলেশনের জন্য ইউনিক আইডি
        schoolName: currentSchoolName,   // মেইন পোর্টালে প্রেরকের নাম দেখানোর জন্য
        title: title, 
        date: date, 
        description: desc 
    };

    let allNotices = JSON.parse(localStorage.getItem('portal_global_notices')) || [];
    allNotices.unshift(newNotice);

    localStorage.setItem('portal_global_notices', JSON.stringify(allNotices));
    alert(`🎉 নোটিশটি "${currentSchoolName}" এর নামে সফলভাবে প্রকাশিত হয়েছে!`);
    
    document.getElementById('noticeTitle').value = '';
    document.getElementById('noticeDescription').value = '';
    setTodayDateInNotice();
    renderTeacherNoticeList(); // তালিকা রিফ্রেশ
}

// 📋 ১১. শুধুমাত্র এই নির্দিষ্ট স্কুলের নোটিশ ফিল্টার করে ড্যাশবোর্ডে দেখানো
function renderTeacherNoticeList() {
    const logBody = document.getElementById('teacherNoticeLog');
    if(!logBody) return;
    logBody.innerHTML = '';

    // বর্তমান স্কুলের আইডি বের করা
    let currentSchoolName = "কাউন্দিয়া মডেল হাই স্কুল";
    const sessionDataRaw = localStorage.getItem('user_dashboard_session');
    if (sessionDataRaw) {
        const sessionData = JSON.parse(sessionDataRaw);
        if (sessionData.schoolName) {
            currentSchoolName = sessionData.schoolName;
        }
    }
    const currentSchoolId = generateSchoolId(currentSchoolName);

    const allNotices = JSON.parse(localStorage.getItem('portal_global_notices')) || [];
    
    // 🔒 ফিল্টারিং: শুধুমাত্র এই ড্যাশবোর্ডের স্কুলের নোটিশগুলো আলাদা করা হলো
    const schoolSpecificNotices = allNotices.filter(notice => notice.schoolId === currentSchoolId);

    if(schoolSpecificNotices.length === 0) {
        logBody.innerHTML = `<tr><td colspan="3" style="text-align:center; color:#94a3b8;">আপনার প্রতিষ্ঠানের কোনো নোটিশ পাওয়া যায়নি।</td></tr>`;
        return;
    }

    schoolSpecificNotices.forEach(notice => {
        const dateParts = notice.date.split('-');
        const formattedDate = dateParts.length === 3 ? `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}` : notice.date;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td style="font-weight: 600; color: #475569;">${formattedDate}</td>
            <td>
                <div class="notice-title-td">${notice.title}</div>
                <div class="notice-desc-preview">${notice.description}</div>
            </td>
            <td style="text-align: center;">
                <button class="action-btn btn-delete" onclick="deleteNotice('${notice.id}')">
                    <i class="fa-solid fa-trash"></i> মুছুন
                </button>
            </td>
        `;
        logBody.appendChild(tr);
    });
}

// 🗑️ ১২. নোটিশ ডিলিট করা
function deleteNotice(noticeId) {
    if(confirm("আপনি কি নিশ্চিতভাবে এই নোটিশটি ডিলিট করতে চান?")) {
        let allNotices = JSON.parse(localStorage.getItem('portal_global_notices')) || [];
        allNotices = allNotices.filter(notice => notice.id !== noticeId);
        localStorage.setItem('portal_global_notices', JSON.stringify(allNotices));
        renderTeacherNoticeList();
    }
}