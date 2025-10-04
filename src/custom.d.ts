// обработка нетрадиционных для ts файлов
// файлы с расшир svg являются валидными для импорта
declare module '*.svg' {
	import React = require('react'); // импорт реакт(синтаксис commonjs)
	export const ReactComponent: React.FunctionComponent<
		React.SVGProps<SVGSVGElement>
		// React.SVGProps - строгая типизация для свойств svg(обр svg как комопнентов react)
		// SVGProps - набор допустимых свойств для svg элементов
		// <SVGSVGElement> - тип элемента svg - какие еще бывают элементы этого дженерика?
	>;
	const src: string; // путь к SVG файлу обьявляем
	// чтобы ts понял что импорт вернет строку (путь к файлу)
	export default src; // Делаем src дефолтным экспортом модуля зачем?
	// дефолтный экспорт пути -позв два импорта:
	// import svgUrl from './icon.svg'; // → string (путь к файлу)
	// import { ReactComponent } from './icon.svg'; // → React компонент
}
// упрощенные декларации: импорт возвр строку-путь к файлу:
declare module '*.png';
// аналогично
declare module '*.jpg';
//Декларация для JSON  -импорт возвращает содержимое файла как JS обьект типа any
declare module '*.json';
// Декларация для CSS Modules - файлы с суффиксом .module.css генерируют объект с классами
//  ключ - название класса
// значение - сгенерир уник имена(хэщ)
declare module '*.module.css' {
	const classes: { [key: string]: string };
	export default classes;
	// Экспорт объекта классов - позволяет использовать:
	// import styles from './App.module.css';
	// console.log(styles.button); // "button_abc123"
}
// аналогично 2 полседних
declare module '*.module.scss' {
	const classes: { [key: string]: string };
	export default classes;
}

declare module '*.module.sass' {
	const classes: { [key: string]: string };
	export default classes;
}
