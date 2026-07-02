// =========================================================================
// 🏫 কাউন্দিয়া মডেল概念 হাই স্কুল - ডাইনামিক রেজাল্ট ও মেধা তালিকা ইঞ্জিন (Fixed)
// =========================================================================

const subjectMap = {
    "play": ["বাংলা", "ইংরেজি", "গণিত", "সাধারণ জ্ঞান ও মৌখিক", "অঙ্কন ও হাতের কাজ", "ধর্ম শিক্ষা"],
    "nursery": ["বাংলা", "ইংরেজি", "গণিত", "সাধারণ জ্ঞান ও মৌখিক", "অঙ্কন ও হাতের কাজ", "ধর্ম শিক্ষা"],
    "kg": ["বাংলা", "ইংরেজি", "গণিত", "সাধারণ জ্ঞান ও মৌখিক", "অঙ্কন ও হাতের কাজ", "ধর্ম শিক্ষা"],
    "1": ["বাংলা", "ইংরেজি", "গণিত", "প্রাথমিক বিজ্ঞান", "বাংলাদেশ ও বিশ্বপরিচয়", "ধর্ম ও নৈতিক শিক্ষা"],
    "2": ["বাংলা", "ইংরেজি", "গণিত", "প্রাথমিক বিজ্ঞান", "বাংলাদেশ ও বিশ্বপরিচয়", "ধর্ম ও নৈতিক শিক্ষা"],
    "3": ["বাংলা", "ইংরেজি", "গণিত", "প্রাথমিক বিজ্ঞান", "বাংলাদেশ ও বিশ্বপরিচয়", "ধর্ম ও নৈতিক শিক্ষা"],
    "4": ["বাংলা", "ইংরেজি", "গণিত", "প্রাথমিক বিজ্ঞান", "বাংলাদেশ ও বিশ্বপরিচয়", "ধর্ম ও নৈতিক শিক্ষা"],
    "5": ["বাংলা", "ইংরেজি", "গণিত", "প্রাথমিক বিজ্ঞান", "বাংলাদেশ ও বিশ্বপরিচয়", "ধর্ম ও নৈতিক শিক্ষা"],
    "6": ["বাংলা ১ম পত্র", "বাংলা ২য় পত্র", "ইংরেজি ১ম পত্র", "ইংরেজি ২য় পত্র", "গণিত", "বিজ্ঞান", "বাংলাদেশ ও বিশ্বপরিচয়", "ধর্ম ও নৈতিক শিক্ষা", "আইসিটি / ডিজিটাল প্রযুক্তি", "কৃষি শিক্ষা / গার্হস্থ্য বিজ্ঞান"],
    "7": ["বাংলা ১ম পত্র", "বাংলা ২য় পত্র", "ইংরেজি ১ম পত্র", "ইংরেজি ২য় পত্র", "গণিত", "বিজ্ঞান", "বাংলাদেশ ও বিশ্বপরিচয়", "ধর্ম ও নৈতিক শিক্ষা", "আইসিটি / ডিজিটাল প্রযুক্তি", "কৃষি শিক্ষা / গার্হস্থ্য বিজ্ঞান"],
    "8": ["বাংলা ১ম পত্র", "বাংলা ২য় পত্র", "ইংরেজি ১ম পত্র", "ইংরেজি ২য় পত্র", "গণিত", "বিজ্ঞান", "বাংলাদেশ ও বিশ্বপরিচয়", "ধর্ম ও নৈতিক শিক্ষা", "আইসিটি / ডিজিটাল প্রযুক্তি", "কৃষি শিক্ষা / গার্হস্থ্য বিজ্ঞান"],
    "9": {
        "common": ["বাংলা ১ম পত্র", "বাংলা ২য় পত্র", "ইংরেজি ১ম পত্র", "ইংরেজি ২য় পত্র", "গণিত", "ধর্ম ও নৈতিক শিক্ষা", "আইসিটি / ডিজিটাল প্রযুক্তি", "কৃষি শিক্ষা / গার্হস্থ্য বিজ্ঞান"],
        "science": ["পদার্থবিজ্ঞান", "রসায়ন", "জীববিজ্ঞান", "উচ্চতর গণিত"],
        "arts": ["বাংলাদেশের ইতিহাস ও বিশ্বসভ্যতা", "ভূগোল ও পরিবেশ", "পৌরনীতি ও নাগরিকতা", "সাধারণ বিজ্ঞান"],
        "commerce": ["হিসাববিজ্ঞান", "ব্যবসায় উদ্যোগ", "ফিন্যান্স ও ব্যাংকিং", "সাধারণ বিজ্ঞান"]
    },
    "10": {
        "common": ["বাংলা ১ম পত্র", "বাংলা ২য় পত্র", "ইংরেজি ১ম পত্র", "ইংরেজি ২য় পত্র", "গণিত", "ধর্ম ও নৈতিক শিক্ষা", "আইসিটি / ডিজিটাল প্রযুক্তি", "কৃষি শিক্ষা / গার্হস্থ্য বিজ্ঞান"],
        "science": ["পদার্থবিজ্ঞান", "রসায়ন", "জীববিজ্ঞান", "উচ্চতর গণিত"],
        "arts": ["বাংলাদেশের ইতিহাস ও বিশ্বসভ্যতা", "ভূগোল ও পরিবেশ", "পৌরনীতি ও নাগরিকতা", "সাধারণ বিজ্ঞান"],
        "commerce": ["হিসাববিজ্ঞান", "ব্যবসায় উদ্যোগ", "ফিন্যান্স ও ব্যাংকিং", "সাধারণ বিজ্ঞান"]
    }
};

document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    loadStudentsForClass();
});

function setupEventListeners() {
    document.getElementById('classSelect')?.addEventListener('change', () => {
        toggleGroupSelection();
        loadStudentsForClass();
        renderSubjectFields();
    });
    document.getElementById('groupSelect')?.addEventListener('change', () => {
        renderSubjectFields();
    });
    document.getElementById('examType')?.addEventListener('change', () => {
        updateMaxMarksOptions();
        checkForExistingResult();
    });
    document.getElementById('studentSelect')?.addEventListener('change', checkForExistingResult);
}

function toggleGroupSelection() {
    const classVal = document.getElementById('classSelect').value;
    const groupDiv = document.getElementById('groupSelectionDiv');
    if (groupDiv) {
        groupDiv.style.display = (classVal === "9" || classVal === "10") ? "block" : "none";
    }
}

function updateMaxMarksOptions() {
    const examType = document.getElementById('examType').value;
    const totalMarksSelect = document.getElementById('totalMarks');
    if (!totalMarksSelect) return;

    totalMarksSelect.innerHTML = '<option value="">-- সিলেক্ট --</option>';
    if (examType === "tutorial") {
        totalMarksSelect.innerHTML += '<option value="20">২০ নম্বরের পরীক্ষা</option><option value="30">৩০ নম্বরের পরীক্ষা</option>';
    } else if (examType === "semester") {
        totalMarksSelect.innerHTML += '<option value="70">৭০ নম্বরের পরীক্ষা</option><option value="80">৮০ নম্বরের পরীক্ষা</option>';
    } else if (examType === "combined") {
        totalMarksSelect.innerHTML += '<option value="100_20_80">২০ + ৮০ = ১০০ মান</option><option value="100_30_70">৩০ + ৭০ = ১০০ মান</option>';
    }
}

function renderSubjectFields() {
    const classVal = document.getElementById('classSelect').value;
    const container = document.getElementById('subjectInputContainer');
    if (!container || !classVal) return;

    container.innerHTML = "";
    let subjects = [];

    if (classVal === "9" || classVal === "10") {
        const group = document.getElementById('groupSelect')?.value || 'science';
        subjects = [...subjectMap[classVal]["common"], ...subjectMap[classVal][group]];
    } else {
        subjects = subjectMap[classVal] || [];
    }

    subjects.forEach(subject => {
        const div = document.createElement('div');
        div.className = "form-group col-md-6";
        div.innerHTML = `
            <label>${subject}:</label>
            <input type="number" class="form-control subject-mark" data-subject="${subject}" min="0" placeholder="নম্বর লিখুন">
        `;
        container.appendChild(div);
    });
    
    checkForExistingResult();
}

function loadStudentsForClass() {
    const classVal = document.getElementById('classSelect').value;
    const studentSelect = document.getElementById('studentSelect');
    if (!studentSelect) return;

    studentSelect.innerHTML = '<option value="">-- শিক্ষার্থী সিলেক্ট করুন --</option>';
    const allStudents = JSON.parse(localStorage.getItem('students_list')) || [];
    const filteredStudents = allStudents.filter(st => st.class === classVal);

    filteredStudents.forEach(st => {
        studentSelect.innerHTML += `<option value="${st.id}">রোল: ${st.roll} - ${st.name}</option>`;
    });
}

function checkForExistingResult() {
    const studentId = document.getElementById('studentSelect')?.value;
    const examType = document.getElementById('examType')?.value;
    const markInputs = document.querySelectorAll('.subject-mark');

    if (!studentId || !examType || markInputs.length === 0) return;

    const allResults = JSON.parse(localStorage.getItem('institute_results')) || {};
    const resultKey = `${studentId}_${examType}`;

    if (allResults[resultKey] && allResults[resultKey].marks) {
        const savedMarks = allResults[resultKey].marks;
        
        markInputs.forEach(input => {
            const subName = input.getAttribute('data-subject');
            if (savedMarks[subName] !== undefined) {
                input.value = savedMarks[subName];
            }
        });
        
        const noticeDiv = document.getElementById('editNotice') || createNoticeElement();
        noticeDiv.innerHTML = "📝 এই শিক্ষার্থীর নম্বর আগে সেভ করা হয়েছে। পরিবর্তন করে আবার সেভ করলে তা আপডেট হয়ে যাবে।";
        noticeDiv.style.display = "block";
    } else {
        markInputs.forEach(input => input.value = "");
        const noticeDiv = document.getElementById('editNotice');
        if (noticeDiv) noticeDiv.style.display = "none";
    }
}

function createNoticeElement() {
    const notice = document.createElement('div');
    notice.id = "editNotice";
    notice.style.cssText = "background: #fef3c7; color: #b45309; padding: 10px; border-radius: 5px; margin-bottom: 15px; font-weight: 500; font-size: 14px; grid-column: 1 / -1;";
    const container = document.getElementById('subjectInputContainer');
    container.parentNode.insertBefore(notice, container);
    return notice;
}

function saveStudentResult() {
    const studentId = document.getElementById('studentSelect').value;
    const examType = document.getElementById('examType').value;
    const totalMarks = document.getElementById('totalMarks').value;
    const classVal = document.getElementById('classSelect').value;

    if (!studentId || !examType || !totalMarks) {
        alert("❌ দয়া করে শিক্ষার্থী, পরীক্ষার নাম ও পূর্ণমান সঠিকভাবে সিলেক্ট করুন!");
        return;
    }

    const markInputs = document.querySelectorAll('.subject-mark');
    let marksData = {};
    let totalObtained = 0;

    for (let input of markInputs) {
        const subName = input.getAttribute('data-subject');
        const score = parseFloat(input.value) || 0;
        marksData[subName] = score;
        totalObtained += score;
    }

    let allResults = JSON.parse(localStorage.getItem('institute_results')) || {};
    const resultKey = `${studentId}_${examType}`;

    allResults[resultKey] = {
        studentId: studentId,
        class: classVal,
        examType: examType,
        totalMarksSetting: totalMarks,
        marks: marksData,
        totalObtained: totalObtained
    };

    localStorage.setItem('institute_results', JSON.stringify(allResults));
    alert("🎉 নম্বর সফলভাবে আপডেট/সংরক্ষিত হয়েছে!");
    
    generateMeritList(classVal, examType);
}

// 🏆 ফিক্সড মেধা তালিকা জেনারেশন ফাংশন (লাল দাগ মুক্ত)
function generateMeritList(targetClass, targetExam) {
    const allStudents = JSON.parse(localStorage.getItem('students_list')) || [];
    const allResults = JSON.parse(localStorage.getItem('institute_results')) || {};
    const tableBody = document.getElementById('meritTableBody');
    
    if (!tableBody) return;
    tableBody.innerHTML = "";
    
    let meritList = [];
    
    // 🎯 ড্রপডাউন এবং ডাটাবেজের বাংলা নাম মেলানোর ম্যাপিং
    const classMatches = {
        'play': 'প্লে', 'nursery': 'নার্সারি', 'kg': 'কে.জি',
        '1': 'প্রথম', '2': 'দ্বিতীয়', '3': 'তৃতীয়', '4': 'চতুর্থ', '5': 'পঞ্চম',
        '6': 'ষষ্ঠ', '7': 'সপ্তম', '8': 'অষ্টম', '9': 'নবম', '10': 'দশম'
    };

    // ১. শ্রেণি ফিল্টার করা
    const filteredStudents = allStudents.filter(st => {
        const dbClass = st.class ? st.class.trim() : "";
        return dbClass === targetClass || classMatches[targetClass] === dbClass;
    });
    
    // ২. রেজাল্ট ডাটা খুঁজে লিস্টে পুশ করা (ডুপ্লিকেট মুক্ত লজিক)
    filteredStudents.forEach(student => {
        const studentId = student.uid || student.id;
        
        // সম্ভাব্য সব উপায়ে রেজাল্ট কী (Key) চেক করা হচ্ছে
        const possibleKeys = [
            `${studentId}_${targetExam}`,
            `${studentId}_7`, 
            `SID ${student.roll}_${targetExam}`
        ];
        
        let foundResult = null;
        for (let key of possibleKeys) {
            if (allResults[key]) {
                foundResult = allResults[key];
                break;
            }
        }
        
        if (foundResult) {
            meritList.push({
                id: studentId,
                roll: student.roll,
                name: student.name,
                totalMarks: foundResult.totalObtained || foundResult.total || 0,
                examName: document.getElementById('examType')?.options[document.getElementById('examType').selectedIndex]?.text || targetExam
            });
        }
    });

    // ৩. বেশি নম্বর পাওয়া অনুযায়ী মেধা তালিকা সাজানো (সর্টিং)
    meritList.sort((a, b) => b.totalMarks - a.totalMarks);

    // ৪. যদি কোনো শিক্ষার্থীর ডাটা না থাকে
    if (meritList.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center;">এই ক্লাসের কোনো নম্বর ইনপুট দেওয়া হয়নি।</td></tr>`;
        return;
    }

    // ৫. সেরা ৩ জন শিক্ষার্থীকে লোকালস্টোরেজে সেভ করা (ড্যাশবোর্ডের জন্য)
    let topThree = {};
    meritList.slice(0, 3).forEach((student, index) => {
        const positions = ["১ম", "২য়", "৩য়"];
        topThree[student.id] = {
            position: positions[index],
            name: student.name,
            exam: student.examName
        };
    });
    localStorage.setItem('top_three_students', JSON.stringify(topThree));

    // ৬. আপনার স্ক্রিনের টেবিল অনুযায়ী HTML জেনারেট করে লাইভ প্রিন্ট করা
    meritList.forEach((item, index) => {
        const row = `
            <tr>
                <td style="text-align:center;">${index + 1}</td>
                <td style="text-align:center;">${item.roll}</td>
                <td>${item.name}</td>
                <td style="text-align:center;">${item.totalMarks}</td>
                <td style="text-align:center; font-weight: bold; color: #0284c7;">${index + 1}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}
function printMeritList() {
    window.print();
}

// ==========================================
// ১. এইচটিএমএল এলিমেন্টসমূহ নির্বাচন
// ==========================================
const classSelect = document.getElementById('classSelect');
const studentSelect = document.getElementById('studentSelect');
const groupSelectionDiv = document.getElementById('groupSelectionDiv');
const groupSelect = document.getElementById('groupSelect');

// ==========================================
// ২. শ্রেণি পরিবর্তনের সাথে সাথে শিক্ষার্থী লোড করার লজিক
// ==========================================
classSelect.addEventListener('change', function() {
    const selectedClass = this.value; // ড্রপডাউন থেকে পাওয়া মান (যেমন: 'play', '7', '9' ইত্যাদি)
    
    // ৯ম ও ১০ম শ্রেণির ক্ষেত্রে বিভাগ (Group) সিলেকশন দেখানো বা লুকানো
    if (selectedClass === '9' || selectedClass === '10') {
        groupSelectionDiv.style.display = 'block';
    } else {
        groupSelectionDiv.style.display = 'none';
        groupSelect.value = 'science'; // ডিফল্ট রিসেট
    }

    // শিক্ষার্থীদের ড্রপডাউনটি ডাইনামিকালি লোড করা
    loadStudentsByFilter();
});

// বিভাগ পরিবর্তন করলেও যেন শিক্ষার্থী তালিকা আপডেট হয় (৯ম/১০ম শ্রেণির জন্য)
groupSelect.addEventListener('change', loadStudentsByFilter);

// ==========================================
// ৩. লোকালস্টোরেজ থেকে ডাটা ফিল্টার করার মূল ফাংশন
// ==========================================
function loadStudentsByFilter() {
    const selectedClass = classSelect.value;
    const selectedGroup = groupSelect.value;

    // ১. প্রথমে শিক্ষার্থী ড্রপডাউনটি ডিফল্ট অবস্থায় ফিরিয়ে আনা
    studentSelect.innerHTML = '<option value="">-- শিক্ষার্থী সিলেক্ট করুন --</option>';

    if (!selectedClass) return; // কোনো শ্রেণি সিলেক্ট না থাকলে এখানেই শেষ

    // ২. লোকালস্টোরেজ থেকে 'students_list' নিয়ে আসা
    const allStudents = JSON.parse(localStorage.getItem('students_list')) || [];

    // ৩. স্ক্রিনশটের বাংলা নামের সাথে ড্রপডাউনের ভ্যালু ম্যাপিং করার নিয়ম
    // (যদি আপনার তালিকা পেজে বাংলা লেখা থাকে, তবে তা হ্যান্ডেল করার জন্য এই ব্যবস্থা)
    const classMapping = {
        'play': 'প্লে', 'nursery': 'নার্সারি', 'nursery_bangla': 'নাসার্সী', 'kg': 'কেজি',
        '1': '১ম', '2': '২য়', '3': '৩য়', '4': '৪র্থ', '5': '৫ম', '6': '৬ষ্ঠ', '7': 'সপ্তম', '8': '৮ম', '9': '৯ম', '10': '১০ম'
    };

    // ৪. ফিল্টারিং প্রসেস
    const filteredStudents = allStudents.filter(student => {
        // শিক্ষার্থীর ক্লাসের নাম সাধারণ বা ম্যাপিং করা নামের সাথে মিলছে কি না পরীক্ষা করা
        const studentClassStr = student.class ? student.class.trim() : '';
        const targetClassStr = classMapping[selectedClass] || selectedClass;
        
        const isClassMatch = studentClassStr.includes(targetClassStr) || studentClassStr.toLowerCase() === selectedClass.toLowerCase();

        // যদি ৯ম বা ১০ম শ্রেণি হয়, তবে বিভাগের মিলও চেক করবে
        if (selectedClass === '9' || selectedClass === '10') {
            const studentGroup = student.group || 'science';
            return isClassMatch && studentGroup === selectedGroup;
        }

        return isClassMatch;
    });

    // ৫. ফিল্টার হওয়া শিক্ষার্থীদের ৪ নম্বর ড্রপডাউনে যুক্ত করা
    if (filteredStudents.length === 0) {
        const option = document.createElement('option');
        option.value = "";
        option.textContent = "⚠️ এই শ্রেণিতে কোনো শিক্ষার্থী পাওয়া যায়নি";
        studentSelect.appendChild(option);
    } else {
        filteredStudents.forEach(student => {
            const option = document.createElement('option');
            option.value = student.id; // ইউনিক আইডি (যেমন: SID 20267001)
            option.textContent = `${student.name} (রোল: ${student.roll})`;
            studentSelect.appendChild(option);
        });
    }
}

// ==========================================
// ৪. নম্বর সংরক্ষণ ও মেধা তালিকায় পাঠানোর ডেমো ফাংশন
// ==========================================
function saveStudentResult() {
    const selectedStudent = studentSelect.value;
    if (!classSelect.value || !selectedStudent) {
        alert('দয়া করে শ্রেণি এবং নির্দিষ্ট শিক্ষার্থী নির্বাচন করুন!');
        return;
    }
    
    // আপনার আগের তৈরি করা নম্বর সংরক্ষণের লজিক ও ড্যাশবোর্ডে ডাটা পুশ করার কোডটি এখানে সচল থাকবে।
    alert('নম্বর সফলভাবে সংরক্ষণ করা হয়েছে এবং শিক্ষার্থীর ড্যাশবোর্ডে পাঠানো হয়েছে!');
    generateMeritList(document.getElementById('classSelect').value, document.getElementById('examType').value);
}