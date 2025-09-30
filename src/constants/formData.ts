// названия шрифтов
//  ограничиваем ключи полей формы нашими данными -для типизации заголовков полей формы
export enum FormElemsTitles {
	fontFamily = 'Шрифт',
	fontSize = 'Размер шрифта',
	fontColor = 'Цвет шрифта',
	backgroundColor = 'Цвет фона',
	contentWidth = 'Ширина контента',
}
// множество названий полей формы
export type FormElemsTitlesValues = `${FormElemsTitles}`;
// множество ключей состояния формы
//  ограничиваем ключи полей формы нашими данными -для типизации заголовков полей формы
export type FormKeys = keyof typeof FormElemsTitles;
//  состояние данных формы
export type FormState<T> = {
	[key in FormKeys]: T;
};
