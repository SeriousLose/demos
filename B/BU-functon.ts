/**
 * 时间格式化工具函数
 * @param { (Date | number) } date - 时间
 * @param { string } unit - 转换格式
 */
export const timeFormat = (date: Date | number | string, unit: string) => {
  if (!date) {
    return '';
  }
  if (typeof date === 'string') return date;
  if (typeof date === 'number') {
    date = new Date(date);
  }
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  if (unit === 'year') return `${year}`;
  if (unit === 'month') return `${year}-${month}`;
  if (unit === 'day') return `${year}-${month}-${day}`;
  if (unit === 'hour') return `${year}-${month}-${day} ${hour}`;
  if (unit === 'minute') return `${year}-${month}-${day} ${hour}:${minute}`;
  if (unit === 'second') return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};

/**
 * Assign the project to an employee.
 * @param {Object} employee - The employee who is responsible for the project.
 * @param {string} employee.name - The name of the employee.
 * @param {string} employee.department - The employee's department.
 */
Project.prototype.assign = function (employee) {
  // ...
};

/**
 * 时间格式化工具函数
 *
 * @param { (Date | number) } date - 时间
 * @param { string } [unit] - 转换格式
 */
export const timeFormat = (date: Date ｜ number | string, unit: string) => {
  // ...
}

/**
 * 时间格式化工具函数
 *
 * @param { (Date | number) } date - 时间
 * @param { string= } unit - 转换格式
 */
export const timeFormat = (date: Date ｜ number | string, unit: string) => {
  // ...
}


/**
 * 时间格式化工具函数
 * @param { (Date | number) } date - 时间
 * @param { string } [unit = 'second'] - 转换格式
 */
export const timeFormat = (date: Date ｜ number | string, unit: string) => {
  // ...
}

async function printer_proxy_print(
  html_str: string,
  file_path: string,
  device: string | undefined,
  orientation: number,
  printer_mode: string,
  width: number,
  height: number,
  scale: number,
  from: number,
  to: number,
  left_offset: number,
  top_offset: number,
  pdf_tools: string | undefined,
  begin_page = 1,
  end_page = 1,
  repeat_times = 1,
  print_type: string
) {
    // ...
}

async function printer_proxy_print(
  html_str: string,
  file_path: string,
  device = 'pc',
  orientation = 'xxx',
  printer_mode = 'xxx',
  width = 123,
  height = 123,
  scale = 123,
  from = 123,
  to = 123,
  left_offset = 123,
  top_offset = 123,
  pdf_tools = 123,
  begin_page = 1,
  end_page = 1,
  repeat_times = 1,
  print_type = 'base64'
) {
    // ...
}

await printer_proxy_print(html_str, file_path);

async function printer_proxy_print({
  html_str,
  file_path,
  device = 'pc',
  orientation = 'xxx',
  printer_mode = 'xxx',
  width = 123,
  height = 123,
  scale = 123,
  from = 123,
  to = 123,
  left_offset = 123,
  top_offset = 123,
  pdf_tools = 123,
  begin_page = 1,
  end_page = 1,
  repeat_times = 1,
  print_type = 'base64'
}) {
    // ...
}

await printer_proxy_print({html_str, file_path});