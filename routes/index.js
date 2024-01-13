const express = require("express");
const route = express();
const signupmodel = require("../models/signup");
const session = require("express-session");
const { isadmin, islogout } = require("../middleware/adminmiddleware");
const addbookmodel = require("../models/bookmodel");
const bookmodel = require("../models/bookmodel");
const nodemailer = require("nodemailer");
const librarymodel = require("../models/libraryuser");
const noticemodel = require("../models/noticemodel");
route.use(session({ secret: "hello123" }));

// send mail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "shihabmoni15@gmail.com",
    pass: "hduwmlisadkbpglj",
  },
});
route.get("/", islogout, async (req, res) => {
  try {
    const bookdata = await bookmodel.find();
    const storybook = await bookmodel.find({ book_name: "গল্প" });
    const noticeimage = await noticemodel.find();
    let fulldate = new Date();
    let fulldateformat = fulldate.toLocaleDateString("en-CA");
    const finddate = await librarymodel.find({ giving_time: fulldateformat });
    if (finddate) {
      await finddate.map((data) => {
        const info = transporter.sendMail({
          from: "shihabmoni15@gmail.com", // sender address
          to: "shihabmoni15@gmail.com", // list of receivers
          subject: `${data.student_name} has been over time`, // Subject line
          text: `${data.student_name} has benn over his/her time.`,
        });
      });
    }

    // const bookdata2=await bookmodel.find()
    res.render("home", { bookdata, storybook, noticeimage });
    console.log(bookdata);
  } catch (err) {
    console.log(err.message);
  }
});
// story book
route.get("/story", islogout, async (req, res) => {
  try {
    const bookdata = await bookmodel.find({ book_name: "গল্প" });
    // const bookdata2=await bookmodel.find()
    res.render("storybook", { bookdata });
    console.log(bookdata);
  } catch (err) {
    console.log(err.message);
  }
});
// search page
route.get("/search_page", islogout, async (req, res) => {
  try {
    const search_query = req.query.book_name;
    let searchinfo = "";
    if (req.query.book_name) {
      searchinfo = req.query.book_name;
    }
    const bookdata = await bookmodel.find({
      $or: [
        { book_name: { $regex: ".*" + searchinfo + ".*" } },
        { company_name: { $regex: ".*" + searchinfo + ".*" } },
        { class_name: { $regex: ".*" + searchinfo + ".*" } },
        { full_name: { $regex: ".*" + searchinfo + ".*" } },
        { writter_name: { $regex: ".*" + searchinfo + ".*" } },
      ],
    });
    console.log(req.query.book_name);
    res.render("searchpage", { bookdata });
  } catch (err) {
    console.log(err.message);
  }
});
route.post("/search_page", islogout, async (req, res) => {
  try {
    const search = req.body.search;
    res.redirect(`/search_page?book_name=${search}`);
  } catch (err) {
    console.log(err.message);
  }
});
route.get("/get_data", async function (req, res) {
  try {
    const search_query = req.query.search_query;
    let searchinfo = "";
    if (req.query.search_query) {
      searchinfo = req.query.search_query;
    }
    const allbookinfo = await bookmodel.find({
      $or: [
        { book_name: { $regex: ".*" + searchinfo + ".*" } },
        { company_name: { $regex: ".*" + searchinfo + ".*" } },
        { class_name: { $regex: ".*" + searchinfo + ".*" } },
        { writter_name: { $regex: ".*" + searchinfo + ".*" } },
      ],
    });
    res.send({ allbookinfo });
  } catch (err) {
    console.log(err);
  }
});
// bangla
route.get("/bangla", islogout, async (req, res) => {
  try {
    const banglabook = await bookmodel.find({ book_name: "বাংলা" });
    res.render("banglabook", { banglabook });
  } catch (err) {
    console.log(err.message);
  }
});
// english
route.get("/english", islogout, async (req, res) => {
  try {
    const englishbook = await bookmodel.find({ book_name: "ইংরেজি" });
    res.render("englishbook", { englishbook });
  } catch (err) {
    console.log(err.message);
  }
});
// math
route.get("/math", islogout, async (req, res) => {
  try {
    const mathbook = await bookmodel.find({ book_name: "গণিত" });
    res.render("mathbook", { mathbook });
  } catch (err) {
    console.log(err.message);
  }
});
// chemistry
route.get("/chemistry", islogout, async (req, res) => {
  try {
    const chemistrybook = await bookmodel.find({ book_name: "রসায়ন" });
    res.render("chemistrybook", { chemistrybook });
  } catch (err) {
    console.log(err.message);
  }
});
// physics
route.get("/physics", islogout, async (req, res) => {
  try {
    const physicsbook = await bookmodel.find({ book_name: "পদার্থবিজ্ঞান" });
    res.render("physicsbook", { physicsbook });
  } catch (err) {
    console.log(err.message);
  }
});
// biology
route.get("/biology", islogout, async (req, res) => {
  try {
    const biologybook = await bookmodel.find({ book_name: "জীববিজ্ঞান" });
    res.render("biologybook", { biologybook });
  } catch (err) {
    console.log(err.message);
  }
});
// ict
route.get("/ict", islogout, async (req, res) => {
  try {
    const ictbook = await bookmodel.find({ book_name: "তথ্য" });
    res.render("ictbook", { ictbook });
  } catch (err) {
    console.log(err.message);
  }
});
// all book
route.get("/books", islogout, async (req, res) => {
  try {
    const bookdata = await bookmodel.find();
    res.render("allbook", { bookdata });
  } catch (err) {
    console.log(err.message);
  }
});
// science
route.get("/science", islogout, async (req, res) => {
  try {
    const sciencebook = await bookmodel.find({ group_name: "সাইন্স" });
    res.render("sciencebook", { sciencebook });
  } catch (err) {
    console.log(err.message);
  }
});
// commerce
route.get("/commerce", islogout, async (req, res) => {
  try {
    const commercebook = await bookmodel.find({ group_name: "কমার্স" });
    res.render("commercebook", { commercebook });
  } catch (err) {
    console.log(err.message);
  }
});
// arts
route.get("/arts", islogout, async (req, res) => {
  try {
    const artsbook = await bookmodel.find({ group_name: "আর্টস" });
    res.render("artsbook", { artsbook });
  } catch (err) {
    console.log(err.message);
  }
});
// book fear
route.get("/new_year_books", islogout, async (req, res) => {
  try {
    const bookdata = await bookmodel.find({ book_year: "২০২৪" });
    res.render("bookfear", { bookdata });
  } catch (err) {
    console.log(err.message);
  }
});
// book fear
route.get("/book-information/:id", islogout, async (req, res) => {
  try {
    const matchbookdata = await bookmodel.findById({ _id: req.params.id });
    res.render("bookinfo", { matchbookdata });
  } catch (err) {
    console.log(err.message);
  }
});
// first year
route.get("/first-year-books", islogout, (req, res) => {
  try {
    res.render("firstybook");
  } catch (err) {
    console.log(err);
  }
});
// second year
route.get("/second-year-books", islogout, (req, res) => {
  try {
    res.render("secondybook");
  } catch (err) {
    console.log(err);
  }
});
// login
route.get("/login", islogout, (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    console.log(err);
  }
});
route.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const matchadmin = await signupmodel.findOne({ email: email });
    if (matchadmin) {
      if (matchadmin.password == password) {
        if (matchadmin.is_admin == 1) {
          req.session.admin_id = matchadmin;
          res.redirect("/admin");
        } else {
          res.redirect("/login");
        }
      } else {
        res.redirect("/login");
      }
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.log(err);
  }
});
// logout
route.get("/logout", (req, res) => {
  try {
    req.session.destroy();
    res.redirect("/");
  } catch (err) {
    console.log(err.message);
  }
});
// contact
route.get("/contact", (req, res) => {
  try {
    res.render("contact");
  } catch (err) {
    console.log(err.message);
  }
});
// admin
route.get("/admin", isadmin, async (req, res) => {
  try {
    let searchinfo = "";
    if (req.query.searchbook) {
      searchinfo = req.query.searchbook;
    }
    const allbookinfo = await bookmodel.find({
      $or: [
        { book_name: { $regex: ".*" + searchinfo + ".*" } },
        { company_name: { $regex: ".*" + searchinfo + ".*" } },
        { class_name: { $regex: ".*" + searchinfo + ".*" } },
        { writter_name: { $regex: ".*" + searchinfo + ".*" } },
      ],
    });

    res.render("admin", { allbookinfo });
  } catch (err) {
    console.log(err.message);
  }
});
// delete book
route.get("/delete-book/:id", isadmin, async (req, res) => {
  try {
    await bookmodel.findByIdAndDelete({ _id: req.params.id });
    res.redirect("/admin");
  } catch (err) {
    console.log(err.message);
  }
});
// update book
route.get("/update-book/:id", isadmin, async (req, res) => {
  try {
    const bookdata = await bookmodel.findById({ _id: req.params.id });
    res.render("updatebook", { bookdata });
  } catch (err) {
    console.log(err.message);
  }
});
route.post("/update-book/:id", isadmin, async (req, res) => {
  try {
    const bookdata = await bookmodel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          book_name: req.body.bookname,
          full_name: req.body.fullname,
          company_name: req.body.company,
          image: req.body.image,
          writter_name: req.body.writter,
          class_name: req.body.classname,
          book_year: req.body.bookyear,
          quantity: req.body.quantity,
        },
      }
    );
    res.redirect("/admin");
  } catch (err) {
    console.log(err.message);
  }
});
// admin
route.get("/add-book", isadmin, (req, res) => {
  try {
    res.render("addbook");
  } catch (err) {
    console.log(err.message);
  }
});
route.post("/add-book", (req, res) => {
  try {
    const addbookinfo = new addbookmodel({
      book_name: req.body.bookname,
      book_type: req.body.booktype,
      full_name: req.body.fullname,
      company_name: req.body.company,
      image: req.body.image,
      group_name: req.body.groupname,
      writter_name: req.body.writter,
      class_name: req.body.classname,
      book_year: req.body.bookyear,
      quantity: req.body.quantity,
    });
    addbookinfo.save();
    res.render("addbook");
  } catch (err) {
    console.log(err.message);
  }
});
// library
route.get("/library", isadmin, async (req, res) => {
  try {
    res.render("library");
  } catch (err) {
    console.log(err.message);
  }
});
route.post("/library", isadmin, (req, res) => {
  try {
    const libraryuseradd = new librarymodel({
      book_name: req.body.bookname,
      student_name: req.body.stdname,
      student_id: req.body.stdid,
      class: req.body.classname,
      group_name: req.body.groupname,
      subject_type: req.body.booktype,
      book_year: req.body.bookyear,
      days: req.body.days,
      receiving_time: req.body.recevingtime,
      giving_time: req.body.givingtime,
    });
    libraryuseradd.save();
    res.redirect("/library");
  } catch (err) {
    console.log(err.message);
  }
});
// library
route.get("/first-year", isadmin, async (req, res) => {
  try {
    let searchinfo = "";
    if (req.query.search_student) {
      searchinfo = req.query.search_student;
    }
    const firstyeardata = await librarymodel.find({
      class: "একাদশ",
      $or: [
        { book_name: { $regex: ".*" + searchinfo + ".*" } },
        { student_name: { $regex: ".*" + searchinfo + ".*" } },
        { class: { $regex: ".*" + searchinfo + ".*" } },
        { group_name: { $regex: ".*" + searchinfo + ".*" } },
        { student_id: { $regex: ".*" + searchinfo + ".*" } },
      ],
    });
    // const firstyeardata = await librarymodel.find({ class: "একাদশ" });
    res.render("firstyear", { firstyeardata });
    let fulldate = new Date();
    let fulldateformat = fulldate.toLocaleDateString("en-CA");
    const finddate = await librarymodel.find({ giving_time: fulldateformat });
    if (finddate) {
      finddate.map((data) => {
        console.log(data.student_name);
      });
    } else {
      console.log("nothing is here");
    }
  } catch (err) {
    console.log(err.message);
  }
});
// library
route.get("/second-year", isadmin, async (req, res) => {
  try {
    let searchinfo = "";
    if (req.query.search_student) {
      searchinfo = req.query.search_student;
    }
    const secondyeardata = await librarymodel.find({
      class: "দ্বাদশ",
      $or: [
        { book_name: { $regex: ".*" + searchinfo + ".*" } },
        { student_name: { $regex: ".*" + searchinfo + ".*" } },
        { class: { $regex: ".*" + searchinfo + ".*" } },
        { group_name: { $regex: ".*" + searchinfo + ".*" } },
        { student_id: { $regex: ".*" + searchinfo + ".*" } },
      ],
    });
    // const secondyeardata = await librarymodel.find({ class: "দ্বাদশ" });
    res.render("secondyear", { secondyeardata });
  } catch (err) {
    console.log(err.message);
  }
});
// notice show
route.get("/show-notice", isadmin, (req, res) => {
  try {
    res.render("noticeshow");
  } catch (err) {
    console.log(err);
  }
});
route.post("/show-notice", (req, res) => {
  try {
    const noticedata = new noticemodel({
      image: req.body.image,
    });
    noticedata.save();
    res.redirect("/show-notice");
  } catch (err) {
    console.log(err);
  }
});
// library student infirmation update
route.get(
  "/student-library-information-update/:id",
  isadmin,
  async (req, res) => {
    try {
      const libraryinfo = await librarymodel.findById({ _id: req.params.id });
      res.render("libraryupdate", { libraryinfo });
    } catch (err) {
      console.log(err);
    }
  }
);
route.post(
  "/student-library-information-update/:id",
  isadmin,
  async (req, res) => {
    try {
      const studentinfo = await librarymodel.findByIdAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            book_name: req.body.bookname,
            student_name: req.body.stdname,
            student_id: req.body.stdid,
            class: req.body.classname,
            group_name: req.body.groupname,
            subject_type: req.body.booktype,
            book_year: req.body.bookyear,
            days: req.body.days,
            receiving_time: req.body.recevingtime,
            giving_time: req.body.givingtime,
          },
        }
      );
      res.redirect("/second-year");
    } catch (err) {
      console.log(err);
    }
  }
);
route.get(
  "/student-library-information-delete-secondyear/:id",
  isadmin,
  async (req, res) => {
    try {
      await librarymodel.findByIdAndDelete({ _id: req.params.id });
      res.redirect("/second-year");
    } catch (err) {
      console.log(err.message);
    }
  }
);
// library student infirmation update first year
route.get(
  "/student-library-information-update-first-year/:id",
  isadmin,
  async (req, res) => {
    try {
      const libraryinfo = await librarymodel.findById({ _id: req.params.id });
      res.render("firstyearupdate", { libraryinfo });
    } catch (err) {
      console.log(err);
    }
  }
);
route.post(
  "/student-library-information-update-first-year/:id",
  isadmin,
  async (req, res) => {
    try {
      const studentinfo = await librarymodel.findByIdAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            book_name: req.body.bookname,
            student_name: req.body.stdname,
            student_id: req.body.stdid,
            class: req.body.classname,
            group_name: req.body.groupname,
            subject_type: req.body.booktype,
            book_year: req.body.bookyear,
            days: req.body.days,
            receiving_time: req.body.recevingtime,
            giving_time: req.body.givingtime,
          },
        }
      );
      res.redirect("/first-year");
    } catch (err) {
      console.log(err);
    }
  }
);
route.get(
  "/student-library-information-delete-first-year/:id",
  isadmin,
  async (req, res) => {
    try {
      await librarymodel.findByIdAndDelete({ _id: req.params.id });
      res.redirect("/first-year");
    } catch (err) {
      console.log(err.message);
    }
  }
);
// first year student search
route.get("/admin", isadmin, async (req, res) => {
  try {
    let searchinfo = "";
    if (req.query.searchbook) {
      searchinfo = req.query.searchbook;
    }
    const allbookinfo = await bookmodel.find({
      $or: [
        { book_name: { $regex: ".*" + searchinfo + ".*" } },
        { company_name: { $regex: ".*" + searchinfo + ".*" } },
        { class_name: { $regex: ".*" + searchinfo + ".*" } },
        { writter_name: { $regex: ".*" + searchinfo + ".*" } },
      ],
    });

    res.render("admin", { allbookinfo });
  } catch (err) {
    console.log(err.message);
  }
});
module.exports = route;
