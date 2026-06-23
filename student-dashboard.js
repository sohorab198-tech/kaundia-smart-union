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