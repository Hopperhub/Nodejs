class Transcoder {
  constructor() {
    this.packageHeaderLength = 4; // 包头长度
    this.serialNumber = 0; // 包序列号
    this.packageSerialNumberLength = 2; // 包序列号所占的字节 
  }

  /**
   * 编码
   * @param {object} data Buffer 对象数据 
   * @param {number} serialNumber 包序列号
   */
  encode(data, serialNumber) {
    const body = Buffer.from(data);

    const header = Buffer.alloc(this.packageHeaderLength);
    header.writeUInt16BE(serialNumber || this.serialNumber);
    header.writeUInt16BE(body.length, this.packageSerialNumberLength); // 跳过包序列号的前两位

    if (serialNumber === undefined) {
      this.serialNumber++; // 默认包序列号被使用时，需更新它的值
    }

    return Buffer.concat([header, body]);
  }

  /**
   * 解码
   * @param {object} buffer 
   */
  decode(buffer) {
    const header = buffer.slice(0, this.packageHeaderLength); // 获取包头
    const body = buffer.slice(this.packageHeaderLength); // 获取包尾

    return {
      serialNumber: header.readUInt16BE(),
      bodyLength: header.readUInt16BE(this.packageSerialNumberLength), // 编码时跳过序列号的前两位，所以解码也需要
      body: body.toString(),
    }
  }

  /**
   * 获取包的长度
   * @param {object} buffer 
   * @returns a. 包未加载完，返回 0 不作处理；b. 加载完，返回包的长度
   */
  getPackageLength(buffer) {
    if (buffer.length < this.packageHeaderLength) {
      return 0;
    }

    return this.packageHeaderLength + buffer.readUInt16BE(this.packageSerialNumberLength);
  }
}

module.exports = Transcoder;