// processClipboard.js
// const clipboardy = require("clipboardy");
const { default: fs } = await import("fs");
const { default: clipboardy } = await import("clipboardy");
// const { exec } = require("child_process");

// 读取剪切板内容
const clipboardContent = clipboardy.readSync();

try {
  // 尝试解析为 JSON
  const jsonData = JSON.parse(clipboardContent);

  // 逻辑处理示例：
  // 假设需要将 JSON 数据分为两个部分处理
  console.log(jsonData.OriVals);
  const ov = jsonData.OriVals;
  const nv = jsonData.NewVals;
  for (const k of ["utm", "delivery_strategy_cmd", "creative_setting"]) {
    if (ov[k]) {
      ov[k] = JSON.parse(ov[k]);
    }
    if (nv[k]) {
      nv[k] = JSON.parse(nv[k]);
    }
  }

  // 将 JSON 数据写入两个文件
  fs.writeFileSync("old.json", JSON.stringify(ov, null, 2), "utf8");
  fs.writeFileSync("new.json", JSON.stringify(nv, null, 2), "utf8");

  console.log(
    "JSON content processed and written to file1.json and file2.json"
  );
} catch (error) {
  // 如果不是 JSON 格式，则输出错误提示
  console.error(
    "Clipboard content is not valid JSON. Please check the clipboard content."
  );
  console.error(error.message);
}

// 逻辑处理（这里是简单示例，你可以替换为自己的逻辑）
// const processedContent1 = clipboardContent.toUpperCase();
// const processedContent2 = clipboardContent.toLowerCase();

// // 写入两个文件
// fs.writeFileSync("file1.txt", processedContent1, "utf8");
// fs.writeFileSync("file2.txt", processedContent2, "utf8");

// 执行后续命令
// exec('echo "Post-processing complete!"', (err, stdout, stderr) => {
//   if (err) {
//     console.error(`Error executing command: ${err}`);
//     return;
//   }
//   console.log(stdout);
// });
