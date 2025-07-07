const fs = require("fs");
const path = require("path");
const { cleanGameFolder, zipFolder } = require("valkream-function-lib");

const { configFolderToClean } = require("./config.json");

class BuildScript {
  async init() {
    console.log("🛠️  Initialisation du script de build...");
    this.path = path.join(__dirname, "src");
    this.output = path.join(__dirname, "build.zip");

    if (!fs.existsSync(this.path)) {
      console.log("❌ Le dossier de build n'existe pas.");
      process.exit(1);
    }
    if (fs.existsSync(this.output)) {
      fs.unlinkSync(this.output);
      console.log("⚠️  Le fichier de build a été supprimé.");
    }

    await this.cleanConfigFolders();
    await this.zip();

    console.log("\n✅ Script de build terminé.");
  }

  async cleanConfigFolders() {
    console.log("🧹 Nettoyage des dossiers de configuration...");
    cleanGameFolder(this.path, configFolderToClean);
  }

  async zip() {
    console.log("📦 Compression en cours...");
    await zipFolder(this.path, this.output);
  }
}

new BuildScript().init();
