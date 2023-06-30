/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// main.ts
__export(exports, {
  default: () => main_default
});

// src/App.ts
var import_obsidian3 = __toModule(require("obsidian"));

// src/Modal.ts
var import_obsidian = __toModule(require("obsidian"));
var CameraModal = class extends import_obsidian.Modal {
  constructor(app2, cameraSettings) {
    super(app2);
    this.videoStream = null;
    this.chosenFolderPath = cameraSettings.chosenFolderPath;
  }
  onOpen() {
    return __async(this, null, function* () {
      const { contentEl } = this;
      const webCamContainer = contentEl.createDiv();
      const statusMsg = webCamContainer.createEl("span", { text: "Loading.." });
      const videoEl = webCamContainer.createEl("video");
      const buttonsDiv = webCamContainer.createDiv();
      const firstRow = buttonsDiv.createDiv();
      const secondRow = buttonsDiv.createDiv();
      const recordVideoButton = firstRow.createEl("button", {
        text: "Start recording"
      });
      const switchCameraButton = firstRow.createEl("button", {
        text: "Switch Camera"
      });
      const snapPhotoButton = firstRow.createEl("button", {
        text: "Take a snap"
      });
      firstRow.style.display = "none";
      secondRow.style.display = "none";
      const filePicker = secondRow.createEl("input", {
        placeholder: "Choose image file from system",
        type: "file"
      });
      filePicker.accept = "image/*,video/*";
      filePicker.capture = "camera";
      const filePicker2 = secondRow.createEl("input", {
        placeholder: "Choose image file from system",
        type: "file"
      });
      filePicker2.accept = "image/*";
      filePicker2.capture = "camera";
      videoEl.autoplay = true;
      videoEl.muted = true;
      const chunks = [];
      let recorder = null;
      this.videoStream = null;
      const cameras = (yield navigator.mediaDevices.enumerateDevices()).filter((d) => d.kind === "videoinput");
      if (cameras.length <= 1)
        switchCameraButton.style.display = "none";
      let cameraIndex = 0;
      const getVideoStream = () => __async(this, null, function* () {
        try {
          return yield navigator.mediaDevices.getUserMedia({
            video: { deviceId: cameras[cameraIndex].deviceId },
            audio: true
          });
        } catch (error) {
          console.log(error);
          return null;
        }
      });
      this.videoStream = yield getVideoStream();
      if (this.videoStream) {
        firstRow.style.display = "block";
        secondRow.style.display = "block";
        statusMsg.style.display = "none";
      } else {
        secondRow.style.display = "block";
        statusMsg.textContent = "Error in loading videostream in your device..";
      }
      const handleImageSelectChange = (file) => __async(this, null, function* () {
        const chosenFile = file;
        const bufferFile = yield chosenFile.arrayBuffer();
        saveFile(bufferFile, false, chosenFile.name.split(" ").join("-"));
      });
      filePicker.onchange = () => handleImageSelectChange(filePicker.files[0]);
      filePicker2.onchange = () => handleImageSelectChange(filePicker2.files[0]);
      const view = this.app.workspace.getActiveViewOfType(import_obsidian.MarkdownView);
      const saveFile = (file, isImage = false, fileName = "") => __async(this, null, function* () {
        if (!fileName) {
          const dateString = (new Date() + "").slice(4, 28).split(" ").join("_").split(":").join("-");
          fileName = isImage ? `image_${dateString}.png` : `video_${dateString}.webm`;
        }
        if (!isImage)
          new import_obsidian.Notice("Adding video to vault...");
        const filePath = this.chosenFolderPath + "/" + fileName;
        const folderExists = app.vault.getAbstractFileByPath(this.chosenFolderPath);
        if (!folderExists)
          yield app.vault.createFolder(this.chosenFolderPath);
        const fileExists = app.vault.getAbstractFileByPath(filePath);
        if (!fileExists)
          yield app.vault.createBinary(filePath, file);
        if (!view)
          return new import_obsidian.Notice(`Saved to ${filePath}`);
        const cursor = view.editor.getCursor();
        view.editor.replaceRange(isImage ? `![${fileName}](${filePath})
` : `
![[${filePath}]]
`, cursor);
        this.close();
      });
      switchCameraButton.onclick = () => __async(this, null, function* () {
        cameraIndex = (cameraIndex + 1) % cameras.length;
        this.videoStream = yield getVideoStream();
      });
      snapPhotoButton.onclick = () => {
        const canvas = webCamContainer.createEl("canvas");
        canvas.style.display = "none";
        const { videoHeight, videoWidth } = videoEl;
        canvas.height = videoHeight;
        canvas.width = videoWidth;
        canvas.getContext("2d").drawImage(videoEl, 0, 0, videoWidth, videoHeight);
        canvas.toBlob((blob) => __async(this, null, function* () {
          const bufferFile = yield blob.arrayBuffer();
          saveFile(bufferFile, true);
        }), "image/png");
      };
      videoEl.srcObject = this.videoStream;
      recordVideoButton.onclick = () => __async(this, null, function* () {
        switchCameraButton.disabled = true;
        let isRecording = recorder && recorder.state === "recording";
        if (isRecording)
          recorder.stop();
        isRecording = !isRecording;
        recordVideoButton.innerText = isRecording ? "Stop Recording" : "Start Recording";
        if (!recorder) {
          recorder = new MediaRecorder(this.videoStream, {
            mimeType: "video/webm"
          });
        }
        recorder.ondataavailable = (e) => chunks.push(e.data);
        recorder.onstop = (_) => __async(this, null, function* () {
          const blob = new Blob(chunks, {
            type: "audio/ogg; codecs=opus"
          });
          const bufferFile = yield blob.arrayBuffer();
          saveFile(bufferFile, false);
        });
        recorder.start();
      });
    });
  }
  onClose() {
    var _a;
    const { contentEl } = this;
    (_a = this.videoStream) == null ? void 0 : _a.getTracks().forEach((track) => {
      track.stop();
    });
    contentEl.empty();
  }
};
var Modal_default = CameraModal;

// src/SettingsTab.ts
var import_obsidian2 = __toModule(require("obsidian"));
var DEFAULT_SETTINGS = {
  chosenFolderPath: "attachments/snaps"
};
var CameraSettingsTab = class extends import_obsidian2.PluginSettingTab {
  constructor(app2, plugin) {
    super(app2, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Obsidian-Camera settings" });
    new import_obsidian2.Setting(containerEl).setName("Folder Path").setDesc("Folder where the videos and snaps should be saved").addText((text) => text.setPlaceholder("Enter your secret").setValue(this.plugin.settings.chosenFolderPath).onChange((value) => __async(this, null, function* () {
      console.log("Chosen Folder Path: " + value);
      this.plugin.settings.chosenFolderPath = value;
      yield this.plugin.saveSettings();
    })));
  }
};

// src/App.ts
var ObsidianCamera = class extends import_obsidian3.Plugin {
  onload() {
    return __async(this, null, function* () {
      yield this.loadSettings();
      this.addRibbonIcon("camera", "Obsidian Camera", (evt) => {
        new Modal_default(this.app, this.settings).open();
      });
      this.addSettingTab(new CameraSettingsTab(this.app, this));
      this.addCommand({
        id: "Open camera modal",
        name: "Open camera modal / File Picker",
        callback: () => {
          new Modal_default(this.app, this.settings).open();
        }
      });
    });
  }
  loadSettings() {
    return __async(this, null, function* () {
      this.settings = Object.assign({}, DEFAULT_SETTINGS, yield this.loadData());
    });
  }
  saveSettings() {
    return __async(this, null, function* () {
      yield this.saveData(this.settings);
    });
  }
};

// main.ts
var main_default = ObsidianCamera;
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWFpbi50cyIsICJzcmMvQXBwLnRzIiwgInNyYy9Nb2RhbC50cyIsICJzcmMvU2V0dGluZ3NUYWIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBPYnNpZGlhbkNhbWVyYSBmcm9tIFwic3JjL0FwcFwiO1xuXG5leHBvcnQgZGVmYXVsdCBPYnNpZGlhbkNhbWVyYSIsICJpbXBvcnQgeyBQbHVnaW4gfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCBDYW1lcmFNb2RhbCBmcm9tIFwiLi9Nb2RhbFwiO1xuaW1wb3J0IENhbWVyYVNldHRpbmdzVGFiLCB7IERFRkFVTFRfU0VUVElOR1MsIENhbWVyYVBsdWdpblNldHRpbmdzIH0gZnJvbSBcIi4vU2V0dGluZ3NUYWJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT2JzaWRpYW5DYW1lcmEgZXh0ZW5kcyBQbHVnaW4ge1xuICBzZXR0aW5nczogQ2FtZXJhUGx1Z2luU2V0dGluZ3M7XG4gIGFzeW5jIG9ubG9hZCgpIHtcbiAgICBhd2FpdCB0aGlzLmxvYWRTZXR0aW5ncygpO1xuICAgIHRoaXMuYWRkUmliYm9uSWNvbihcImNhbWVyYVwiLCBcIk9ic2lkaWFuIENhbWVyYVwiLCAoZXZ0OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICBuZXcgQ2FtZXJhTW9kYWwodGhpcy5hcHAsIHRoaXMuc2V0dGluZ3MpLm9wZW4oKTtcbiAgICB9KTtcbiAgICB0aGlzLmFkZFNldHRpbmdUYWIobmV3IENhbWVyYVNldHRpbmdzVGFiKHRoaXMuYXBwLCB0aGlzKSk7XG5cbiAgICB0aGlzLmFkZENvbW1hbmQoe1xuICAgICAgaWQ6IFwiT3BlbiBjYW1lcmEgbW9kYWxcIixcbiAgICAgIG5hbWU6IFwiT3BlbiBjYW1lcmEgbW9kYWwgLyBGaWxlIFBpY2tlclwiLFxuICAgICAgY2FsbGJhY2s6ICgpID0+IHtcbiAgICAgICAgbmV3IENhbWVyYU1vZGFsKHRoaXMuYXBwLCB0aGlzLnNldHRpbmdzKS5vcGVuKCk7XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cblxuICBhc3luYyBsb2FkU2V0dGluZ3MoKSB7XG4gICAgdGhpcy5zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfU0VUVElOR1MsIGF3YWl0IHRoaXMubG9hZERhdGEoKSk7XG4gIH1cblxuICBhc3luYyBzYXZlU2V0dGluZ3MoKSB7XG4gICAgYXdhaXQgdGhpcy5zYXZlRGF0YSh0aGlzLnNldHRpbmdzKTtcbiAgfVxufVxuIiwgImltcG9ydCB7IEFwcCwgTWFya2Rvd25WaWV3LCBNb2RhbCwgTm90aWNlIH0gZnJvbSAnb2JzaWRpYW4nXG5pbXBvcnQgeyBDYW1lcmFQbHVnaW5TZXR0aW5ncyB9IGZyb20gJy4vU2V0dGluZ3NUYWInO1xuXG5jbGFzcyBDYW1lcmFNb2RhbCBleHRlbmRzIE1vZGFsIHtcbiAgY2hvc2VuRm9sZGVyUGF0aDogc3RyaW5nO1xuICB2aWRlb1N0cmVhbTogTWVkaWFTdHJlYW0gPSBudWxsO1xuICBjb25zdHJ1Y3RvcihhcHA6IEFwcCwgY2FtZXJhU2V0dGluZ3M6IENhbWVyYVBsdWdpblNldHRpbmdzKSB7XG4gICAgc3VwZXIoYXBwKTtcbiAgICB0aGlzLmNob3NlbkZvbGRlclBhdGggPSBjYW1lcmFTZXR0aW5ncy5jaG9zZW5Gb2xkZXJQYXRoXG4gIH1cblxuICBhc3luYyBvbk9wZW4oKSB7XG4gICAgY29uc3QgeyBjb250ZW50RWwgfSA9IHRoaXM7XG4gICAgY29uc3Qgd2ViQ2FtQ29udGFpbmVyID0gY29udGVudEVsLmNyZWF0ZURpdigpO1xuXG4gICAgY29uc3Qgc3RhdHVzTXNnID0gd2ViQ2FtQ29udGFpbmVyLmNyZWF0ZUVsKCdzcGFuJywgeyB0ZXh0OiBcIkxvYWRpbmcuLlwiIH0pXG4gICAgY29uc3QgdmlkZW9FbCA9IHdlYkNhbUNvbnRhaW5lci5jcmVhdGVFbChcInZpZGVvXCIpO1xuICAgIGNvbnN0IGJ1dHRvbnNEaXYgPSB3ZWJDYW1Db250YWluZXIuY3JlYXRlRGl2KCk7XG4gICAgY29uc3QgZmlyc3RSb3cgPSBidXR0b25zRGl2LmNyZWF0ZURpdigpO1xuICAgIGNvbnN0IHNlY29uZFJvdyA9IGJ1dHRvbnNEaXYuY3JlYXRlRGl2KCk7XG4gICAgY29uc3QgcmVjb3JkVmlkZW9CdXR0b24gPSBmaXJzdFJvdy5jcmVhdGVFbChcImJ1dHRvblwiLCB7XG4gICAgICB0ZXh0OiBcIlN0YXJ0IHJlY29yZGluZ1wiLFxuICAgIH0pO1xuICAgIGNvbnN0IHN3aXRjaENhbWVyYUJ1dHRvbiA9IGZpcnN0Um93LmNyZWF0ZUVsKFwiYnV0dG9uXCIsIHtcbiAgICAgIHRleHQ6IFwiU3dpdGNoIENhbWVyYVwiLFxuICAgIH0pO1xuICAgIGNvbnN0IHNuYXBQaG90b0J1dHRvbiA9IGZpcnN0Um93LmNyZWF0ZUVsKFwiYnV0dG9uXCIsIHtcbiAgICAgIHRleHQ6IFwiVGFrZSBhIHNuYXBcIixcbiAgICB9KTtcbiAgICBmaXJzdFJvdy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIHNlY29uZFJvdy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG4gICAgY29uc3QgZmlsZVBpY2tlciA9IHNlY29uZFJvdy5jcmVhdGVFbChcImlucHV0XCIsIHtcbiAgICAgIHBsYWNlaG9sZGVyOiBcIkNob29zZSBpbWFnZSBmaWxlIGZyb20gc3lzdGVtXCIsXG4gICAgICB0eXBlOiBcImZpbGVcIixcbiAgICB9KTtcbiAgICBmaWxlUGlja2VyLmFjY2VwdCA9IFwiaW1hZ2UvKix2aWRlby8qXCI7XG4gICAgZmlsZVBpY2tlci5jYXB0dXJlID0gXCJjYW1lcmFcIjsgLy8gYmFjayBjYW1lcmEgYnkgZGVmYXVsdCBmb3IgbW9iaWxlIHNjcmVlbnNcblxuICAgIGNvbnN0IGZpbGVQaWNrZXIyID0gc2Vjb25kUm93LmNyZWF0ZUVsKFwiaW5wdXRcIiwge1xuICAgICAgcGxhY2Vob2xkZXI6IFwiQ2hvb3NlIGltYWdlIGZpbGUgZnJvbSBzeXN0ZW1cIixcbiAgICAgIHR5cGU6IFwiZmlsZVwiLFxuICAgIH0pO1xuICAgIGZpbGVQaWNrZXIyLmFjY2VwdCA9IFwiaW1hZ2UvKlwiO1xuICAgIGZpbGVQaWNrZXIyLmNhcHR1cmUgPSBcImNhbWVyYVwiOyAvLyBiYWNrIGNhbWVyYSBieSBkZWZhdWx0IGZvciBtb2JpbGUgc2NyZWVuc1xuXG5cbiAgICB2aWRlb0VsLmF1dG9wbGF5ID0gdHJ1ZTtcbiAgICB2aWRlb0VsLm11dGVkID0gdHJ1ZVxuICAgIGNvbnN0IGNodW5rczogQmxvYlBhcnRbXSA9IFtdO1xuICAgIGxldCByZWNvcmRlcjogTWVkaWFSZWNvcmRlciA9IG51bGw7XG4gICAgdGhpcy52aWRlb1N0cmVhbSA9IG51bGw7XG5cbiAgICBjb25zdCBjYW1lcmFzID0gKFxuICAgICAgYXdhaXQgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5lbnVtZXJhdGVEZXZpY2VzKClcbiAgICApLmZpbHRlcigoZCkgPT4gZC5raW5kID09PSBcInZpZGVvaW5wdXRcIik7XG5cbiAgICBpZiAoY2FtZXJhcy5sZW5ndGggPD0gMSkgc3dpdGNoQ2FtZXJhQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBsZXQgY2FtZXJhSW5kZXggPSAwO1xuXG4gICAgY29uc3QgZ2V0VmlkZW9TdHJlYW0gPSBhc3luYyAoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gYXdhaXQgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoe1xuICAgICAgICAgIHZpZGVvOiB7IGRldmljZUlkOiBjYW1lcmFzW2NhbWVyYUluZGV4XS5kZXZpY2VJZCB9LFxuICAgICAgICAgIGF1ZGlvOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMudmlkZW9TdHJlYW0gPSBhd2FpdCBnZXRWaWRlb1N0cmVhbSgpO1xuICAgIGlmICh0aGlzLnZpZGVvU3RyZWFtKSB7XG4gICAgICBmaXJzdFJvdy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xuICAgICAgc2Vjb25kUm93LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXG4gICAgICBzdGF0dXNNc2cuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXG4gICAgfSBlbHNlIHtcbiAgICAgIHNlY29uZFJvdy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xuICAgICAgc3RhdHVzTXNnLnRleHRDb250ZW50ID0gXCJFcnJvciBpbiBsb2FkaW5nIHZpZGVvc3RyZWFtIGluIHlvdXIgZGV2aWNlLi5cIlxuICAgIH1cblxuICAgIGNvbnN0IGhhbmRsZUltYWdlU2VsZWN0Q2hhbmdlID0gYXN5bmMgKGZpbGU6IEZpbGUpID0+IHtcbiAgICAgIGNvbnN0IGNob3NlbkZpbGUgPSBmaWxlO1xuICAgICAgY29uc3QgYnVmZmVyRmlsZSA9IGF3YWl0IGNob3NlbkZpbGUuYXJyYXlCdWZmZXIoKTtcbiAgICAgIHNhdmVGaWxlKGJ1ZmZlckZpbGUsIGZhbHNlLCBjaG9zZW5GaWxlLm5hbWUuc3BsaXQoJyAnKS5qb2luKCctJykpO1xuICAgIH07XG4gICAgZmlsZVBpY2tlci5vbmNoYW5nZSA9ICgpID0+IGhhbmRsZUltYWdlU2VsZWN0Q2hhbmdlKGZpbGVQaWNrZXIuZmlsZXNbMF0pXG4gICAgZmlsZVBpY2tlcjIub25jaGFuZ2UgPSAoKSA9PiBoYW5kbGVJbWFnZVNlbGVjdENoYW5nZShmaWxlUGlja2VyMi5maWxlc1swXSlcblxuXG4gICAgY29uc3QgdmlldyA9IHRoaXMuYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVWaWV3T2ZUeXBlKE1hcmtkb3duVmlldyk7XG5cbiAgICBjb25zdCBzYXZlRmlsZSA9IGFzeW5jIChmaWxlOiBBcnJheUJ1ZmZlciwgaXNJbWFnZSA9IGZhbHNlLCBmaWxlTmFtZSA9ICcnKSA9PiB7XG4gICAgICBpZiAoIWZpbGVOYW1lKSB7XG4gICAgICAgIGNvbnN0IGRhdGVTdHJpbmcgPSAobmV3IERhdGUoKSArIFwiXCIpXG4gICAgICAgICAgLnNsaWNlKDQsIDI4KVxuICAgICAgICAgIC5zcGxpdChcIiBcIilcbiAgICAgICAgICAuam9pbihcIl9cIilcbiAgICAgICAgICAuc3BsaXQoXCI6XCIpXG4gICAgICAgICAgLmpvaW4oXCItXCIpO1xuICAgICAgICBmaWxlTmFtZSA9IGlzSW1hZ2VcbiAgICAgICAgICA/IGBpbWFnZV8ke2RhdGVTdHJpbmd9LnBuZ2BcbiAgICAgICAgICA6IGB2aWRlb18ke2RhdGVTdHJpbmd9LndlYm1gO1xuICAgICAgfVxuICAgICAgaWYgKCFpc0ltYWdlKSBuZXcgTm90aWNlKFwiQWRkaW5nIHZpZGVvIHRvIHZhdWx0Li4uXCIpXG5cbiAgICAgIGNvbnN0IGZpbGVQYXRoID0gdGhpcy5jaG9zZW5Gb2xkZXJQYXRoICsgXCIvXCIgKyBmaWxlTmFtZTtcbiAgICAgIGNvbnN0IGZvbGRlckV4aXN0cyA9XG4gICAgICAgIGFwcC52YXVsdC5nZXRBYnN0cmFjdEZpbGVCeVBhdGgodGhpcy5jaG9zZW5Gb2xkZXJQYXRoKTtcbiAgICAgIGlmICghZm9sZGVyRXhpc3RzKSBhd2FpdCBhcHAudmF1bHQuY3JlYXRlRm9sZGVyKHRoaXMuY2hvc2VuRm9sZGVyUGF0aCk7XG4gICAgICBjb25zdCBmaWxlRXhpc3RzID1cbiAgICAgICAgYXBwLnZhdWx0LmdldEFic3RyYWN0RmlsZUJ5UGF0aChmaWxlUGF0aCk7XG4gICAgICBpZiAoIWZpbGVFeGlzdHMpXG4gICAgICAgIGF3YWl0IGFwcC52YXVsdC5jcmVhdGVCaW5hcnkoZmlsZVBhdGgsIGZpbGUpO1xuXG4gICAgICBpZiAoIXZpZXcpIHJldHVybiBuZXcgTm90aWNlKGBTYXZlZCB0byAke2ZpbGVQYXRofWApO1xuXG4gICAgICBjb25zdCBjdXJzb3IgPSB2aWV3LmVkaXRvci5nZXRDdXJzb3IoKTtcbiAgICAgIHZpZXcuZWRpdG9yLnJlcGxhY2VSYW5nZShcbiAgICAgICAgaXNJbWFnZVxuICAgICAgICAgID8gYCFbJHtmaWxlTmFtZX1dKCR7ZmlsZVBhdGh9KVxcbmBcbiAgICAgICAgICA6IGBcXG4hW1ske2ZpbGVQYXRofV1dXFxuYCxcbiAgICAgICAgY3Vyc29yXG4gICAgICApO1xuICAgICAgdGhpcy5jbG9zZSgpOyAvLyBjbG9zaW5nIHRoZSBtb2RhbFxuICAgIH07XG5cblxuICAgIHN3aXRjaENhbWVyYUJ1dHRvbi5vbmNsaWNrID0gYXN5bmMgKCkgPT4ge1xuICAgICAgY2FtZXJhSW5kZXggPSAoY2FtZXJhSW5kZXggKyAxKSAlIGNhbWVyYXMubGVuZ3RoO1xuICAgICAgdGhpcy52aWRlb1N0cmVhbSA9IGF3YWl0IGdldFZpZGVvU3RyZWFtKCk7XG4gICAgfTtcblxuICAgIHNuYXBQaG90b0J1dHRvbi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgY29uc3QgY2FudmFzID0gd2ViQ2FtQ29udGFpbmVyLmNyZWF0ZUVsKFwiY2FudmFzXCIpO1xuICAgICAgY2FudmFzLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgIGNvbnN0IHsgdmlkZW9IZWlnaHQsIHZpZGVvV2lkdGggfSA9IHZpZGVvRWxcbiAgICAgIGNhbnZhcy5oZWlnaHQgPSB2aWRlb0hlaWdodDtcbiAgICAgIGNhbnZhcy53aWR0aCA9IHZpZGVvV2lkdGg7XG5cbiAgICAgIGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIikuZHJhd0ltYWdlKHZpZGVvRWwsIDAsIDAsIHZpZGVvV2lkdGgsIHZpZGVvSGVpZ2h0KTtcbiAgICAgIGNhbnZhcy50b0Jsb2IoYXN5bmMgKGJsb2IpID0+IHtcbiAgICAgICAgY29uc3QgYnVmZmVyRmlsZSA9IGF3YWl0IGJsb2IuYXJyYXlCdWZmZXIoKTtcbiAgICAgICAgc2F2ZUZpbGUoYnVmZmVyRmlsZSwgdHJ1ZSk7XG4gICAgICB9LCBcImltYWdlL3BuZ1wiKTtcbiAgICB9O1xuXG4gICAgdmlkZW9FbC5zcmNPYmplY3QgPSB0aGlzLnZpZGVvU3RyZWFtO1xuXG4gICAgcmVjb3JkVmlkZW9CdXR0b24ub25jbGljayA9IGFzeW5jICgpID0+IHtcbiAgICAgIHN3aXRjaENhbWVyYUJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgICBsZXQgaXNSZWNvcmRpbmc6IGJvb2xlYW4gPVxuICAgICAgICByZWNvcmRlciAmJiByZWNvcmRlci5zdGF0ZSA9PT0gXCJyZWNvcmRpbmdcIjtcbiAgICAgIGlmIChpc1JlY29yZGluZykgcmVjb3JkZXIuc3RvcCgpO1xuICAgICAgaXNSZWNvcmRpbmcgPSAhaXNSZWNvcmRpbmc7XG4gICAgICByZWNvcmRWaWRlb0J1dHRvbi5pbm5lclRleHQgPSBpc1JlY29yZGluZ1xuICAgICAgICA/IFwiU3RvcCBSZWNvcmRpbmdcIlxuICAgICAgICA6IFwiU3RhcnQgUmVjb3JkaW5nXCI7XG5cbiAgICAgIGlmICghcmVjb3JkZXIpIHtcbiAgICAgICAgcmVjb3JkZXIgPSBuZXcgTWVkaWFSZWNvcmRlcih0aGlzLnZpZGVvU3RyZWFtLCB7XG4gICAgICAgICAgbWltZVR5cGU6IFwidmlkZW8vd2VibVwiLFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmVjb3JkZXIub25kYXRhYXZhaWxhYmxlID0gKGUpID0+IGNodW5rcy5wdXNoKGUuZGF0YSk7XG4gICAgICByZWNvcmRlci5vbnN0b3AgPSBhc3luYyAoXykgPT4ge1xuICAgICAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoY2h1bmtzLCB7XG4gICAgICAgICAgdHlwZTogXCJhdWRpby9vZ2c7IGNvZGVjcz1vcHVzXCIsXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBidWZmZXJGaWxlID0gYXdhaXQgYmxvYi5hcnJheUJ1ZmZlcigpO1xuICAgICAgICBzYXZlRmlsZShidWZmZXJGaWxlLCBmYWxzZSk7XG4gICAgICB9O1xuICAgICAgcmVjb3JkZXIuc3RhcnQoKTtcbiAgICB9O1xuXG5cbiAgfVxuXG4gIG9uQ2xvc2UoKSB7XG4gICAgY29uc3QgeyBjb250ZW50RWwgfSA9IHRoaXM7XG4gICAgdGhpcy52aWRlb1N0cmVhbT8uZ2V0VHJhY2tzKCkuZm9yRWFjaCh0cmFjayA9PiB7XG4gICAgICB0cmFjay5zdG9wKClcbiAgICB9KVxuICAgIGNvbnRlbnRFbC5lbXB0eSgpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENhbWVyYU1vZGFsIiwgIlxuaW1wb3J0IE9ic2lkaWFuQ2FtZXJhIGZyb20gXCJtYWluXCI7XG5pbXBvcnQgeyBBcHAsIFBsdWdpblNldHRpbmdUYWIsIFNldHRpbmcgfSBmcm9tIFwib2JzaWRpYW5cIjtcblxuZXhwb3J0IGludGVyZmFjZSBDYW1lcmFQbHVnaW5TZXR0aW5ncyB7XG4gIGNob3NlbkZvbGRlclBhdGg6IHN0cmluZztcblxufVxuXG5leHBvcnQgY29uc3QgREVGQVVMVF9TRVRUSU5HUzogQ2FtZXJhUGx1Z2luU2V0dGluZ3MgPSB7XG4gIGNob3NlbkZvbGRlclBhdGg6ICdhdHRhY2htZW50cy9zbmFwcydcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FtZXJhU2V0dGluZ3NUYWIgZXh0ZW5kcyBQbHVnaW5TZXR0aW5nVGFiIHtcbiAgcGx1Z2luOiBPYnNpZGlhbkNhbWVyYTtcblxuICBjb25zdHJ1Y3RvcihhcHA6IEFwcCwgcGx1Z2luOiBPYnNpZGlhbkNhbWVyYSkge1xuICAgIHN1cGVyKGFwcCwgcGx1Z2luKTtcbiAgICB0aGlzLnBsdWdpbiA9IHBsdWdpbjtcbiAgfVxuXG4gIGRpc3BsYXkoKTogdm9pZCB7XG4gICAgY29uc3QgeyBjb250YWluZXJFbCB9ID0gdGhpcztcbiAgICBjb250YWluZXJFbC5lbXB0eSgpO1xuICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKCdoMicsIHsgdGV4dDogJ09ic2lkaWFuLUNhbWVyYSBzZXR0aW5ncycgfSk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKCdGb2xkZXIgUGF0aCcpXG4gICAgICAuc2V0RGVzYygnRm9sZGVyIHdoZXJlIHRoZSB2aWRlb3MgYW5kIHNuYXBzIHNob3VsZCBiZSBzYXZlZCcpXG4gICAgICAuYWRkVGV4dCh0ZXh0ID0+IHRleHRcbiAgICAgICAgLnNldFBsYWNlaG9sZGVyKCdFbnRlciB5b3VyIHNlY3JldCcpXG4gICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5jaG9zZW5Gb2xkZXJQYXRoKVxuICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ0Nob3NlbiBGb2xkZXIgUGF0aDogJyArIHZhbHVlKTtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5jaG9zZW5Gb2xkZXJQYXRoID0gdmFsdWU7XG4gICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgIH0pKTtcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7OztBQ0FBLHVCQUF1Qjs7O0FDQXZCLHNCQUFpRDtBQUdqRCxnQ0FBMEIsc0JBQU07QUFBQSxFQUc5QixZQUFZLE1BQVUsZ0JBQXNDO0FBQzFELFVBQU07QUFGUix1QkFBMkI7QUFHekIsU0FBSyxtQkFBbUIsZUFBZTtBQUFBO0FBQUEsRUFHbkMsU0FBUztBQUFBO0FBQ2IsWUFBTSxFQUFFLGNBQWM7QUFDdEIsWUFBTSxrQkFBa0IsVUFBVTtBQUVsQyxZQUFNLFlBQVksZ0JBQWdCLFNBQVMsUUFBUSxFQUFFLE1BQU07QUFDM0QsWUFBTSxVQUFVLGdCQUFnQixTQUFTO0FBQ3pDLFlBQU0sYUFBYSxnQkFBZ0I7QUFDbkMsWUFBTSxXQUFXLFdBQVc7QUFDNUIsWUFBTSxZQUFZLFdBQVc7QUFDN0IsWUFBTSxvQkFBb0IsU0FBUyxTQUFTLFVBQVU7QUFBQSxRQUNwRCxNQUFNO0FBQUE7QUFFUixZQUFNLHFCQUFxQixTQUFTLFNBQVMsVUFBVTtBQUFBLFFBQ3JELE1BQU07QUFBQTtBQUVSLFlBQU0sa0JBQWtCLFNBQVMsU0FBUyxVQUFVO0FBQUEsUUFDbEQsTUFBTTtBQUFB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