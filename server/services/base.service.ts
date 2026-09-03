export class BaseService {
  validateFields(data: any, requiredList: string[]): boolean {
    for (const [key, value] of Object.entries(data) as [
      string,
      string | string[],
    ][]) {
      if (!requiredList.includes(key)) continue;
      if (typeof value == "string" || Array.isArray(value)) {
        if (!value || value.length == 0) {
          return false;
        }
      }
    }

    return true;
  }

  validateUrl(value: string): boolean {
    const urlRegex =
      /^https?:\/\/(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+(?:\/[^\s]*)?$/;

    if (urlRegex.test(value)) return true;

    return false;
  }

  validatePassword(value: string): boolean {
    const passwordRegex = /^[0-9]{4}$/;

    if (passwordRegex.test(value)) return true;

    return false;
  }

  createSlug(str: string) {
    if (!str) return "";

    return str
      .toLowerCase()
      .normalize("NFD") // Tách các dấu chữ cái tiếng Việt
      .replace(/[\u0300-\u036f]/g, "") // Xóa các dấu sau khi tách
      .replace(/[đĐ]/g, "d") // Thay thế chữ đ và Đ
      .replace(/([^0-9a-z-\s])/g, "") // Xóa các ký tự đặc biệt
      .replace(/(\s+)/g, "-") // Thay thế khoảng trắng bằng dấu gạch ngang
      .replace(/-+/g, "-") // Thu gọn nhiều dấu gạch ngang liên tiếp thành 1
      .replace(/^-+|-+$/g, ""); // Cắt bỏ dấu gạch ngang thừa ở đầu và cuối
  }
}
