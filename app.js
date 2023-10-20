var express = require("express");
var app = express();
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );  
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS");
  next();
});
const port= 2461;

let customers = [
  {
    custId: 1,
    name: "ABC",
    password: "abc1234",
    role: "admin",
    email: "abc@gmail.com"
  },
  {
    custId: 2,
    name: "Willie",
    password: "willie1234",
    role: "student",
    email: "willie@gmail.com"
  },
  {
    custId: 3,
    name: "Jack",
    password: "jack1234",
    role: "faculty",
    email: "jack@gmail.com"
  },
  {
    custId: 4,
    name: "James",
    password: "james1234",
    role: "student",
    email: "james@gmail.com"
  },
  {
    custId: 5,
    name: "Harry",
    password: "harry1234",
    role: "faculty",
    email: "harry@gmail.com"
  },
  {
    custId: 6,
    name: "Tia",
    password: "tia1234",
    role: "student",
    email: "tia@gmail.com"
  },
  {
    custId: 7,
    name: "Aditya",
    password: "aditya123",
    role: "faculty",
    email: "aditya@gmail.com"
  },
  {
    custId: 8,
    name: "Sonu",
    password: "sonu1234",
    role: "student",
    email: "sonu@gmail.com"
  },
  {
    custId: 9,
    name: "Ellie",
    password: "ellie1234",
    role: "student",
    email: "ellie@gmail.com"
  },
  {
    custId: 10,
    name: "Gia",
    password: "gia1234",
    role: "faculty",
    email: "gia@gmail.com"
  }
];
let courses = [
  {
    courseId: 1,
    name: "ANGULAR",
    code: "ANG97",
    description: "All fundamentals of Angular 7",
    faculty: ["Daniel", "Jack"],
    students: ["Sam"]
  },
  {
    courseId: 2,
    name: "JAVASCRIPT",
    code: "JS124",
    description: "Intoduction to javascript",
    faculty: ["Aditya"],
    students: ["James", "Joy", "Monu", "Rita"]
  },
  {
    courseId: 3,
    name: "REACT",
    code: "RCT56",
    description: "React Javascript library",
    faculty: ["Jack", "Gia"],
    students: ["Raima", "Rita", "Sonu", "James"]
  },
  {
    courseId: 4,
    name: "BOOTSTRAP",
    code: "BS297",
    description: "Bootstrap Designing Framework",
    faculty: [],
    students: ["James", "Tia", "Ellie"]
  },
  {
    courseId: 5,
    name: "CSS",
    code: "CS365",
    description: "Basic stylesheet language",
    faculty: [],
    students: ["James", "Rita", "Monica"]
  },
  {
    courseId: 6,
    name: "REST AND MICROSERVICES",
    code: "RM392",
    description: "Introduction to Microservices",
    faculty: [],
    students: ["Sam"]
  },
  {
    courseId: 7,
    name: "NODE",
    code: "ND725",
    description: "Introduction to Node",
    faculty: ["Sonia"],
    students: ["Saransh", "Shrey", "Monica"]
  }
];
let faculties = [
  { id: 5, name: "Daniel", courses: ["ANGULAR"] },
  { id: 4, name: "Sonia", courses: ["NODE"] },
  { id: 3, name: "Jack", courses: ["REACT", "ANGULAR"] },
  { id: 2, name: "Gia", courses: ["REACT"] },
  { id: 1, name: "Aditya", courses: ["ANGULAR"] }
];
let classes = [
  {
    classId: 1,
    course: "REACT",
    time: "07:45",
    endTime: "08:45",
    topic: "Redux",
    facultyName: "Jack"
  },
  {
    classId: 2,
    course: "ANGULAR",
    time: "15:45",
    endTime: "17:40",
    topic: "Component",
    facultyName: "Jack"
  },
  {
    classId: 3,
    course: "JAVASCRIPT",
    time: "15:45",
    endTime: "17:40",
    topic: "Component",
    facultyName: "Aditya"
  }
];
let students = [
  {
    id: 16,
    name: "Willie",
    dob: "31-July-1997",
    gender: "male",
    about: "Pursuing Graduation",
    courses: ["ANGULAR", "NODE"]
  },
  {
    id: 15,
    name: "Tia",
    dob: "30-July-1997",
    gender: "male",
    about: "Pursuing Graduation",
    courses: []
  },
  {
    id: 14,
    name: "Apoorv",
    dob: "31-August-1998",
    gender: "male",
    about: "Want to learn new technologies",
    courses: []
  },
  {
    id: 13,
    name: "Joy",
    dob: "31-July-1997",
    gender: "male",
    about: "Pursuing Graduation",
    courses: ["JAVASCRIPT"]
  },
  {
    id: 12,
    name: "Rachel",
    dob: "31-August-1998",
    gender: "female",
    about: "Pursuing Graduation",
    courses: []
  },
  {
    id: 11,
    name: "Monica",
    dob: "30-July-1997",
    gender: "female",
    about: "Want to learn new technologies",
    courses: ["CSS", "NODE"]
  },
  {
    id: 10,
    name: "Monu",
    dob: "12-May-1997",
    gender: "male",
    about: "Pursuing Graduation",
    courses: ["JAVASCRIPT"]
  },
  {
    id: 9,
    name: "Sonu",
    dob: "12-May-1997",
    gender: "male",
    about: "Pursuing Graduation",
    courses: ["REACT"]
  },
  {
    id: 8,
    name: "Raima",
    dob: "30-July-1997",
    gender: "female",
    about: "Want to learn new technologies",
    courses: ["REACT"]
  },
  {
    id: 7,
    name: "Rita",
    dob: "31-August-1998",
    gender: "female",
    about: "Pursuing Graduation",
    courses: ["JAVASCRIPT", "REACT", "CSS"]
  },
  {
    id: 6,
    name: "Shrey",
    dob: "12-May-1997",
    gender: "male",
    about: "Pursuing Graduation",
    courses: ["NODE"]
  },
  {
    id: 5,
    name: "Saransh",
    dob: "31-July-1997",
    gender: "male",
    about: "Want to learn new technologies",
    courses: ["NODE"]
  },
  {
    id: 4,
    name: "Sanya",
    dob: "31-July-1997",
    gender: "male",
    about: "Want to learn new technologies",
    courses: []
  },
  {
    id: 3,
    name: "James",
    dob: "12-July-1994",
    gender: "male",
    about: "Pursuing Graduation",
    courses: ["JAVASCRIPT", "BOOTSTRAP", "CSS", "REACT"]
  },
  {
    id: 2,
    name: "Sam",
    dob: "12-July-1994",
    gender: "male",
    about: "Pursuing Graduation",
    courses: ["ANGULAR", "REST AND MICROSERVICES"]
  },
  {
    id: 1,
    name: "Ellie",
    dob: "12-June-1992",
    gender: "female",
    about: "Want to learn new technologies",
    courses: ["BOOTSTRAP"]
  }
];

app.post('/login', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    var cust = customers.find(function (item) {
        return item.email === email && item.password === password;
    });
    console.log(cust);
    var custRec = {
        name: cust.name,
        email: cust.name.email,
        role: cust.role
    }
    res.send(custRec);
});

//ADMIN 
app.post('/register', function (req, res) {
    let maxid = customers.reduce((acc, curr) => {
        if (curr.custId > acc) {
            return curr.custId;
        } else {
            return acc;
        }
    }, 0);
    let cust = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        custId:maxid+1
    };
    customers.unshift(cust);
    var customerRes = {
        name: req.body.name,
        role: req.body.role,
        email: req.body.email,
    }
    res.send(customerRes);
    
});
app.get('/getStudentNames', function (req, res) {
    let stdArr = students.map((a) => a.name);
    res.send(stdArr);
});
app.get('/getFacultyNames', function (req, res) {
    let stdArr = faculties.map((a) => a.name);
    res.send(stdArr);
});
app.get('/getCourses', function (req, res) {
    res.send(courses);
});
app.put('/putCourse', function (req, res) {
    let course = req.body;
    let findCourseInd = courses.findIndex((a) => a.courseId === +course.courseId);
    if (findCourseInd >= 0) {
        courses[findCourseInd] = course;
        res.status(200).send(course);
    } else {
        res.status(404).send('Could not find course');
    }
});
app.get('/getStudents', function (req, res) {
    let page = req.query.page ? +req.query.page : 1;
    let { course } = req.query;
    let stds = students;
    if (course) {
        let courseArr = course.split(',');
       stds = students.filter((student) =>
        courseArr.some((course) => student.courses.includes(course))
        );
          console.log(courseArr,stds);
    }
  let result = pagination(stds,page);
  res.json({
    page: page,
    items: result,
    totalItems: result.length,
    totalNum: stds.length
  });
})
app.get('/getFaculties', function (req, res) {
    let page = req.query.page ? +req.query.page : 1;
    let { course } = req.query;
    let stds = faculties;
    if (course) {
        let courseArr = course.split(',');
       stds = faculties.filter((student) =>
        courseArr.some((course) => student.courses.includes(course))
        );
          console.log(courseArr,stds);
    }
  let result = pagination(stds,page);
  res.json({
    page: page,
    items: result,
    totalItems: result.length,
    totalNum: stds.length
  });
})

// STUDENT

app.post('/postStudentDetails', function (req, res) {
    let std = req.body;
    let maxid = students.reduce((acc, curr) => {
        if (curr.id > acc) {
            return curr.id;
        } else {
            return acc;
        }
    }, 0);
    let newStd = { ...std, id: maxid + 1, courses: [] };
    students.push(newStd);
    res.json(newStd);

});
app.get('/getStudentDetails/:name', function (req, res) {
    let { name } = req.params;
    let std = students.find((a) => a.name === name);
    if (std) {
        res.json(std);
    } else {
        res.status(404).send('Student not found');
    }
});
app.get('/getStudentCourse/:name', function (req, res) {
    let { name } = req.params;
    let courseArr = courses.filter(course => course.students.find((a)=>a===name));
  //console.log(name, courseArr);
    res.json(courseArr);
});
app.get('/getStudentClass/:name', function (req, res) {
    let { name } = req.params;
    let enrolledArr = courses.filter(course => course.students.includes(name));
    let enrolled = enrolledArr.map((a) => {
        return a.name;
    });
    const studentClasses = classes.filter(cls => enrolled.includes(cls.course));
    res.json(studentClasses);
});

// FACULTY

app.get('/getFacultyCourse/:name', function (req, res) {
    let { name } = req.params;
    let courseArr = courses.filter(course => course.faculty.includes(name));
    let course = courseArr.map((a) => {
        let obj = {
            courseId: a.courseId,
            name: a.name,
            code: a.code,
            description: a.description
        };
        return obj;
    });
    res.json(course);
});
app.get('/getFacultyClass/:name', function (req, res) {
    let { name } = req.params;
    const facultyClasses = classes.filter(cls => cls.facultyName===name);
    res.json(facultyClasses);
});
app.post('/postClass', function (req, res) {
    let cls = req.body;
    let maxid = classes.reduce((acc, curr) => {
        if (curr.classId > acc) {
            return curr.classId;
        } else {
            return acc;
        }
    }, 0);
    let newClass = { ...cls, classId: maxid + 1 };
    classes.push(newClass);
    res.json(newClass);
});
app.put('/postClass/:id', function (req, res) {
    let { id } = req.params;
    let cls = req.body;
    let findClass = classes.findIndex((a) => a.classId === +id);
    if (findClass>=0) {
        let newClass = { ...cls, classId: +id }
        classes[findClass] = newClass;
        res.json(newClass);
    } else {
        res.status(404).send('Class not found');
    }
})

function pagination(obj, page) {
  var resArr = obj;
  resArr = resArr.slice(page * 3 - 3, page * 3);
  return resArr;
}
app.listen(port, () => console.log(`Node app listening on port ${port}!`));
