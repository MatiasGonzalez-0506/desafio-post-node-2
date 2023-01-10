const {addPosts,getPosts,duplicatePost,deletePosts,modifyPosts} = require("./posts");
const express = require("express");
const app = express();
const cors = require("cors");
  
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
  
app.listen(process.env.PORT, console.log("SERVIDOR ENCENDIDO"));
  
app.get("/", (req, res) => {res.sendFile(__dirname + "/public/index.html");});
  
  app.get("/posts", async (req, res) => {
    const posts = await getPosts();
    res.json(posts);
  });
  
  app.post("/posts", async (req, res) => {
    try {
      const payload = req.body;
      const resultDuplicate = await duplicatePost(payload);
      if (payload.id === "" || payload.titulo === "" || payload.url === "" || payload.descripcion === ""){res.send("Aun quedan campos vacios");} 
      else if (resultDuplicate[0].num > 0) {res.send("Ya existe este registro");} 
      else {await addPosts(payload);res.send("Su registro agregado con éxito");}
    } catch (err) {res.json({ message: "Aun quedan campos vacios" });}
  });
  
  app.delete("/posts/:id", async (req, res) => {
    try {const { id } = req.params;
      await deletePosts(id);res.send("Post eliminado con éxito");}
      catch {res.send({ status: "error", data: "error interno del servidor" });}
  });

  app.put("/posts/like/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await modifyPosts(id);res.send("Post modificado con éxito");}
    catch {res.send({ status: "error", data: "error interno del servidor" });}
  });