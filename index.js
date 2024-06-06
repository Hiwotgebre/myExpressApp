const express = require('express');
const app = express();

app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
});

app.set('view engine', "ejs");

app.use((req, res, next) => {
    console.log('Request URL:', req.originalUrl);
    next();
});

//Static Middleware
app.use(express.static('publicImage'));

//Views and Routes
app.get('/home', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/users/:username', (req, res) => {
    res.render('user', {username: req.params.username})
});

//Create a Route to download the image
app.get('/download', (req, res) => {
    const file = `${__dirname}/publicImage/animalpic.jpg`;
    res.download(file, 'DownloadedAnimalPic.jpg', (err) => {
        if (err) {
            console.error("Error downloading the file:", err);
            res.status(500).send("Error occured while downloding the file.");
        }
    });
});



// Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'))

//   const fs = require('fs');
//   const filePath = `${__dirname}/publicImage/animalpic.jpg`;
  
//   fs.stat(filePath, (err, stats) => {
//     if (err) {
//         console.error("File does not exist:", filePath);
//         return; // Stop further execution
//     }

//     app.get('/download', (req, res) => {
//         res.download(filePath, 'OptionalNewFileName.pdf', (err) => {
//             if (err) {
//                 console.log(err);
//                 res.send("Error occurred while downloading the file.");
//                 return;
//             }
//         });
//     });
// });






