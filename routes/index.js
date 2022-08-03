const express = require("express");
const router = express.Router();

const {uploadFile} = require("../middleware/uploadFile");
const {getHeros,getHero,postHero,deleteHero,updateHero} = require("../controllers/hero");
const {getTypes,postType,deleteType,updateType,getType} = require("../controllers/type");

router.get("/heros", getHeros );
router.get("/hero/:id", getHero);
router.post("/hero", uploadFile("image"), postHero);
router.delete("/hero/:id", deleteHero);
router.put("/hero/:id", uploadFile("image"), updateHero);

router.get("/types", getTypes);
router.get("/type",getType)
router.post("/type",postType);
router.delete("/type/:id",deleteType);
router.put("/type/:id",updateType);



module.exports = router;