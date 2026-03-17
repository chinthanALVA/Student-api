const http = require("http");

let students = [];

function sendResponse(res, statusCode, data) {
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
}

function validateStudent(student) {
    if (!student.name || !student.email || !student.course || !student.year) {
        return "All fields are required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(student.email)) {
        return "Invalid email format";
    }

    if (student.year < 1 || student.year > 4) {
        return "Year must be between 1 and 4";
    }

    return null;
}

const server = http.createServer((req, res) => {

    const urlParts = req.url.split("/");
    const baseRoute = urlParts[1];
    const id = urlParts[2];

    if (req.method === "GET" && req.url === "/students") {
        return sendResponse(res, 200, {
            success: true,
            data: students
        });
    }

    if (req.method === "GET" && baseRoute === "students" && id) {
        const student = students.find(s => s.id == id);

        if (!student) {
            return sendResponse(res, 404, {
                success: false,
                message: "Student not found"
            });
        }

        return sendResponse(res, 200, {
            success: true,
            data: student
        });
    }

    if (req.method === "POST" && req.url === "/students") {

        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {
            try {
                const student = JSON.parse(body);

                const error = validateStudent(student);
                if (error) {
                    return sendResponse(res, 400, {
                        success: false,
                        message: error
                    });
                }

                student.id = students.length + 1;
                students.push(student);

                return sendResponse(res, 201, {
                    success: true,
                    message: "Student added",
                    data: student
                });

            } catch (err) {
                return sendResponse(res, 400, {
                    success: false,
                    message: "Invalid JSON"
                });
            }
        });

        return;
    }

    if (req.method === "PUT" && baseRoute === "students" && id) {

        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {
            try {
                const updatedData = JSON.parse(body);

                const student = students.find(s => s.id == id);

                if (!student) {
                    return sendResponse(res, 404, {
                        success: false,
                        message: "Student not found"
                    });
                }

                Object.assign(student, updatedData);

                return sendResponse(res, 200, {
                    success: true,
                    message: "Student updated",
                    data: student
                });

            } catch (err) {
                return sendResponse(res, 400, {
                    success: false,
                    message: "Invalid JSON"
                });
            }
        });

        return;
    }

    if (req.method === "DELETE" && baseRoute === "students" && id) {

        const index = students.findIndex(s => s.id == id);

        if (index === -1) {
            return sendResponse(res, 404, {
                success: false,
                message: "Student not found"
            });
        }

        students.splice(index, 1);

        return sendResponse(res, 200, {
            success: true,
            message: "Student deleted"
        });
    }

    return sendResponse(res, 404, {
        success: false,
        message: "Route not found"
    });

});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});