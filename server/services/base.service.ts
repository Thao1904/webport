export class BaseService {
  validateFields(data: any, requiredList: string[]): boolean {
    for (const [key, value] of Object.entries(data) as [
      string,
      string | string[],
    ][]) {
      if (!requiredList.includes(key)) continue;
      if (typeof value == "string" || Array.isArray(value)) {
        if (value || value.length == 0) {
            return false;
        }
      } 
    }

    return true;
  }

  validateUrl(value: string): boolean {
    const urlRegex = /^https?:\/\/(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+(?:\/[^\s]*)?$/;

    if (urlRegex.test(value)) return true;

    return false
  }

  validatePassword(value: string): boolean {
    const passwordRegex = /^[0-9]{4}$/;

    if (passwordRegex.test(value)) return true;

    return false
  }
}
