/**
 * =========================================================================
 * 📱 ১. মোবাইল স্ক্রিন হ্যামবার্গার ও ওভারলে টগল করার লজিক
 * =========================================================================
 */
function toggleSidebar() {
    const sidebar = document.getElementById('sidebarPanel');
    const overlay = document.getElementById('sidebarOverlay');
    
    if (sidebar && overlay) {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('show');
    }
}

/**
 * =========================================================================
 * 🔄 ২. ১১টি সেকশনের ডাইনামিক সুইচিং মেকানিজম (SPA)
 * =========================================================================
 */
function switchStudentSection(sectionId, element) {
    // ক) সব ড্যাশবোর্ড সেকশন থেকে 'active-section' ক্লাস রিমুভ করা
    const sections = document.querySelectorAll('.dashboard-section');
    sections.forEach(sec => sec.classList.remove('active-section'));

    // খ) ক্লিক করা নির্দিষ্ট সেকশনটি সপ্রণিভ (Active) করা
    const targetSection = document.getElementById(`section-${sectionId}`);
    if (targetSection) {
        targetSection.classList.add('active-section');
    } else {
        console.error(`Section with ID section-${sectionId} not found!`);
    }

    // গ) সাইডবার মেনুর আইটেমগুলোর অ্যাক্টিভ হাইলাইট ঠিক করা
    const menuItems = document.querySelectorAll('.sidebar-menu li');
    menuItems.forEach(item => item.classList.remove('active'));
    
    if (element) {
        element.classList.add('active');
    }

    // ঘ) মোবাইল ভিউতে কোনো মেনু সিলেক্ট করার পর সাইডবার অটোমেটিক ক্লোজ হওয়া
    if (window.innerWidth <= 992) {
        toggleSidebar();
    }
}

/**
 * =========================================================================
 * ⏳ ৩. পেজ লোড হবার পর গ্লোবাল ইনিশিয়ালাইজেশন
 * =========================================================================
 */
document.addEventListener("DOMContentLoaded", function() {
    // যদি লগইন সেশন থেকে শিক্ষার্থীর নাম পাওয়া যায় তা হেডারে ডাইনামিকালি সেট করা
    const sessionDataRaw = localStorage.getItem('user_student_session');
    if (sessionDataRaw) {
        const sessionData = JSON.parse(sessionDataRaw);
        if (sessionData.studentName) {
            document.getElementById('studentWelcomeName').innerText = `স্বাগতম, ${sessionData.studentName}`;
        }
    }
    console.log("স্টুডেন্ট ড্যাশবোর্ড প্যানেল সফলভাবে সক্রিয় হয়েছে।");
});
/**
 * =========================================================================
 * 📊 ডাইনামিক রেজাল্ট পোর্টাল ইঞ্জিনের জাভাস্ক্রিপ্ট লজিক
 * =========================================================================
 */

// ১. ডেমো ডাটাবেজ (যা পূর্ববর্তী প্রোফাইল ও শিক্ষকদের ইনপুট থেকে আসবে)
const mockStudentProfile = {
    name: "রাহিম ইসলাম",
    class: "ষষ্ঠ",
    roll: "১",
    session: "২০২৬"
};

// ছবি-২ এর অনুরূপ পুরো ক্লাসের ডেমো রেজাল্ট ডেটা (মেধা তালিকা টেস্ট করার জন্য)
const mockClassStudents = [
    { roll: "১", name: "রাহিম ইসলাম", tutorialTotal: 25, semesterTotal: 67, finalTotal: 585 },
    { roll: "২", name: "করিম হোসেন", tutorialTotal: 22, semesterTotal: 63, finalTotal: 572 },
    { roll: "৩", name: "সুমাইয়া আক্তার", tutorialTotal: 27, semesterTotal: 56, finalTotal: 565 },
    { roll: "৪", name: "তানিয়া সুলতানা", tutorialTotal: 18, semesterTotal: 67, finalTotal: 551 },
    { roll: "৫", name: "মাহিম হাসান", tutorialTotal: 16, semesterTotal: 59, finalTotal: 544 },
    { roll: "৬", name: "নুসরাত জাহান", tutorialTotal: 26, semesterTotal: 70, finalTotal: 536 },
    { roll: "৭", name: "ফারহান আহমেদ", tutorialTotal: 20, semesterTotal: 50, finalTotal: 528 },
    { roll: "৮", name: "মীম আক্তার", tutorialTotal: 19, semesterTotal: 55, finalTotal: 519 },
    { roll: "৯", name: "সাব্বির রহমান", tutorialTotal: 21, semesterTotal: 48, finalTotal: 507 }
];

// ছবি-১ এর অনুরূপ বিষয়ের বিস্তারিত নম্বর ডেটা
const mockSubjectDetails = [
    { subject: "বাংলা", tutorial: 25, semester: 67 },
    { subject: "ইংরেজি", tutorial: 22, semester: 46 },
    { subject: "গণিত", tutorial: 27, semester: 76 },
    { subject: "বাওবি", tutorial: 18, semester: 65 },
    { subject: "বিজ্ঞান", tutorial: 16, semester: 56 },
    { subject: "ধর্ম", tutorial: 26, semester: 75 }
];

// ২. পরীক্ষার ধরন অনুযায়ী ২০/৩০ বা ৭০/৮০ ডাইনামিক ড্রপডাউন লোড করা
function toggleMarkSelectors() {
    const examType = document.getElementById('examSelect').value;
    const markSelect = document.getElementById('markSelect');
    
    markSelect.innerHTML = '<option value="">-- সিলেক্ট --</option>';
    
    if (examType === 'tutorial') {
        markSelect.innerHTML += '<option value="20">২০ নম্বরের পরীক্ষা</option>';
        markSelect.innerHTML += '<option value="30">৩০ নম্বরের পরীক্ষা</option>';
    } else if (examType === 'semester') {
        markSelect.innerHTML += '<option value="70">৭০ নম্বরের পরীক্ষা</option>';
        markSelect.innerHTML += '<option value="80">৮০ নম্বরের পরীক্ষা</option>';
    } else if (examType === 'combined') {
        markSelect.innerHTML += '<option value="100_20_80">২০ + ৮০ = ১০০ মান</option>';
        markSelect.innerHTML += '<option value="100_30_70">৩০ + ৭০ = ১০০ মান</option>';
    }
}

// ৩. একক রেজাল্ট কার্ড জেনারেটর (ছবি-১ এর হুবহু ডিজাইন)
function generateSingleResultCard() {
    const examSelect = document.getElementById('examSelect');
    const markSelect = document.getElementById('markSelect');
    
    if (!examSelect.value || !markSelect.value) {
        alert('দয়া করে পরীক্ষার নাম এবং পূর্ণমান সঠিকভাবে সিলেক্ট করুন!');
        return;
    }

    // ভিউ কন্ট্রোল
    document.getElementById('resultInitialMessage').style.display = 'none';
    document.getElementById('classSummaryListView').style.display = 'none';
    document.getElementById('singleResultCardView').style.display = 'block';

    // হেডার ও মেটাডাটা সেটআপ
    const examText = examSelect.options[examSelect.selectedIndex].text;
    document.getElementById('cardExamTitle').innerText = `${examText} এর ফলাফল`;
    document.getElementById('cardStudentName').innerText = mockStudentProfile.name;
    document.getElementById('cardClassName').innerText = mockStudentProfile.class;
    document.getElementById('cardRollNo').innerText = mockStudentProfile.roll;
    document.getElementById('cardSession').innerText = mockStudentProfile.session;

    const thContainer = document.getElementById('resultTableHeader');
    const tbContainer = document.getElementById('resultTableBody');
    
    thContainer.innerHTML = '';
    tbContainer.innerHTML = '';

    // কন্ডিশনাল ছক তৈরি এবং ক্যালকুলেশন
    if (examSelect.value === 'tutorial') {
        // ১ম ধরন: টিউটোরিয়াল
        document.getElementById('meritBadgeContainer').style.display = 'none';
        document.getElementById('attendanceRow').style.display = 'none';
        document.getElementById('commentBoxContainer').style.display = 'none';

        thContainer.innerHTML = `<tr><th>বিষয়</th><th>নাম্বার (${markSelect.value})</th></tr>`;
        
        let total = 0;
        mockSubjectDetails.forEach(item => {
            total += item.tutorial;
            tbContainer.innerHTML += `<tr><td><b>${item.subject}</b></td><td>${item.tutorial}</td></tr>`;
        });
        tbContainer.innerHTML += `<tr style="font-weight: bold; background: rgba(255,255,255,0.05);"><td>মোট নাম্বার</td><td>${total}</td></tr>`;

    } else if (examSelect.value === 'semester') {
        // ২য় ধরন: সেমিস্টার
        document.getElementById('meritBadgeContainer').style.display = 'none';
        document.getElementById('attendanceRow').style.display = 'none';
        document.getElementById('commentBoxContainer').style.display = 'none';

        thContainer.innerHTML = `<tr><th>বিষয়</th><th>নাম্বার (${markSelect.value})</th></tr>`;
        
        let total = 0;
        mockSubjectDetails.forEach(item => {
            total += item.semester;
            tbContainer.innerHTML += `<tr><td><b>${item.subject}</b></td><td>${item.semester}</td></tr>`;
        });
        tbContainer.innerHTML += `<tr style="font-weight: bold; background: rgba(255,255,255,0.05);"><td>মোট নাম্বার</td><td>${total}</td></tr>`;

    } else if (examSelect.value === 'combined') {
        // ৩য় ধরন: সম্মিলিত অর্ধ-বার্ষিক ও বার্ষিক কার্ড (সব অপশন অন)
        document.getElementById('meritBadgeContainer').style.display = 'block';
        document.getElementById('attendanceRow').style.display = 'grid';
        document.getElementById('commentBoxContainer').style.display = 'block';
        
        document.getElementById('cardMeritPosition').innerText = "১ম"; // ডেমো পজিশন
        document.getElementById('cardTotalDays').innerText = "১১০";
        document.getElementById('cardPresentDays').innerText = "১০২";
        document.getElementById('cardAbsentDays').innerText = "৮";
        document.getElementById('cardTeacherComment').innerText = "নিয়মিত ক্লাসে উপস্থিত থাকে এবং পড়াশোনায় অত্যন্ত মনোযোগী। ফলাফল অত্যন্ত সন্তোষজনক।";

        const labelText = markSelect.value === '100_20_80' ? 'টিউটোরিয়াল (২০)' : 'টিউটোরিয়াল (৩০)';
        const semesterLabel = markSelect.value === '100_20_80' ? 'সেমিস্টার (৮০)' : 'সেমিস্টার (৭০)';

        thContainer.innerHTML = `
            <tr>
                <th>বিষয়</th>
                <th>${labelText}</th>
                <th>${semesterLabel}</th>
                <th>মোট নাম্বার</th>
                <th>GPA</th>
                <th>LG</th>
            </tr>`;
        
        let tutTotal = 0, semTotal = 0, grandTotal = 0;

        mockSubjectDetails.forEach(item => {
            const subjectSum = item.tutorial + item.semester;
            tutTotal += item.tutorial;
            semTotal += item.semester;
            grandTotal += subjectSum;

            // ডেমো গ্রেড ও জিপিএ ক্যালকুলেশন লজিক
            let lg = "A+", gp = "৫.০০";
            if (subjectSum < 80) { lg = "A"; gp = "৪.০০"; }
            if (subjectSum < 70) { lg = "A-"; gp = "৩.৫০"; }

            tbContainer.innerHTML += `
                <tr>
                    <td><b>${item.subject}</b></td>
                    <td>${item.tutorial}</td>
                    <td>${item.semester}</td>
                    <td>${subjectSum}</td>
                    <td>${gp}</td>
                    <td>${lg}</td>
                </tr>`;
        });

        // মোট নাম্বারের ফাইনাল রো
        tbContainer.innerHTML += `
            <tr style="font-weight: bold; background: rgba(255,255,255,0.05);">
                <td>মোট নাম্বার</td>
                <td>${tutTotal}</td>
                <td>${semTotal}</td>
                <td>${grandTotal}</td>
                <td>৪.৮৫</td>
                <td>A</td>
            </tr>`;
    }
}

// ৪. পুরো ক্লাসের রেজাল্ট সামারি তালিকা (ছবি-২ এর হুবহু বিন্যাস + রোল নম্বর)
function generateClassSummaryList() {
    const examSelect = document.getElementById('examSelect');
    const markSelect = document.getElementById('markSelect');
    
    if (!examSelect.value || !markSelect.value) {
        alert('দয়া করে পরীক্ষার নাম এবং পূর্ণমান সিলেক্ট করুন!');
        return;
    }

    // ভিউ কন্ট্রোল
    document.getElementById('resultInitialMessage').style.display = 'none';
    document.getElementById('singleResultCardView').style.display = 'none';
    document.getElementById('classSummaryListView').style.display = 'block';

    const examText = examSelect.options[examSelect.selectedIndex].text;
    document.getElementById('summaryExamTitle').innerText = examText;
    document.getElementById('summaryClassTitle').innerText = `শ্রেণি: ${mockStudentProfile.class}`;

    const summaryBody = document.getElementById('summaryTableBody');
    summaryBody.innerHTML = '';

    // মোট প্রাপ্ত নম্বরের ক্রমানুসারে (Descending Order) শিক্ষার্থীদের সর্ট করা
    let sortedList = [...mockClassStudents];
    
    if (examSelect.value === 'tutorial') {
        sortedList.sort((a, b) => b.tutorialTotal - a.tutorialTotal);
    } else if (examSelect.value === 'semester') {
        sortedList.sort((a, b) => b.semesterTotal - a.semesterTotal);
    } else {
        sortedList.sort((a, b) => b.finalTotal - a.finalTotal);
    }

    // লুপ চালিয়ে ডাটা টেবিল রো তৈরি (রোল নম্বর প্রথম কলামে)
    sortedList.forEach((student, index) => {
        let displayScore = student.finalTotal;
        if (examSelect.value === 'tutorial') displayScore = student.tutorialTotal;
        if (examSelect.value === 'semester') displayScore = student.semesterTotal;

        summaryBody.innerHTML += `
            <tr>
                <td><b>${student.roll}</b></td>
                <td style="text-align: left;">${student.name}</td>
                <td><span style="background: rgba(255,255,255,0.03); padding: 4px 12px; border-radius: 4px;">${displayScore}</span></td>
                <td style="font-weight: bold; color: ${index === 0 ? '#eab308' : 'var(--text-light)'};">
                    ${index + 1}
                </td>
            </tr>`;
    });
}