export class AppUtils {
  static isValidSortParam(input: string): boolean {
    const regex = /^[a-zA-Z][a-zA-Z0-9_]*:(asc|desc)$/;
    return regex.test(input);
  }
}
