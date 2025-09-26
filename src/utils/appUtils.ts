export class AppUtils {
  static isValidSortParam(input: string): boolean {
    const regex = /^[a-zA-Z][a-zA-Z0-9_]*:(asc|desc)$/;
    return regex.test(input);
  }
  static renderSlug(slug: string, id: number) {
    return `${slug}.${id}`;
  }
  static isValidSlug(input: string): boolean {
    const regex = /^.+\.\d+$/;
    return regex.test(input);
  }
}
