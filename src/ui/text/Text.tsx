import { ElementType, ReactNode } from 'react';
import { clsx } from 'clsx';
import { FontFamiliesClasses } from 'src/constants/articleProps';

import styles from './index.module.scss';
// ElementType - тип для тега HTML или компонента React (например 'div', 'span' или пользовательский компонент).
// FontFamiliesClasses -множество допустимых шрифтов
type TextProps = {
	/** Сам текст для вывода */
	children: ReactNode; // текст или JSX для рендеринга
	/** Тэг которым отрендерить текст */
	as?: ElementType; // тег для вывода, например 'div' или 'span'
	/** Булевая пропса, должен ли текст меняться в зависимости от конфига */
	dynamic?: boolean; // будет ли изменение текста?// должен ли текст меняться по конфигу??
	/** Размер шрифта */
	size?: 12 | 18 | 22 | 25 | 31 | 38 | 45;
	/** Вес шрифта */
	weight?: 400 | 800;
	/** Стиль шрифта */
	fontStyle?: 'italic' | 'normal';
	/** Булевая пропса, отвечающая должен ли текст быть в верхнем регистре */
	uppercase?: boolean;
	/** Выравнивание текста */
	align?: 'center' | 'left';
	/** font-family текста */
	family?: FontFamiliesClasses;
	/** Булевая пропса, делает динамическим только семью шрифтов и цвет */
	dynamicLite?: boolean;
};

// Пропсы позволяют гибко настраивать текст: тег, размер, жирность, шрифт, верхний регистр, динамичность и т.д.
export const Text = ({
	children,
	as: Tag = 'div',
	size = 18,
	dynamic = false,
	weight = 400,
	fontStyle = 'normal',
	uppercase = false,
	align = 'left',
	family = 'open-sans',
	dynamicLite = false,
}: TextProps) => {
	const className = clsx(
		styles.text,
		styles[`size${size}`],
		{ [styles.dynamic]: dynamic },
		styles[`weight${weight}`],
		styles[`${fontStyle}`],
		{ [styles.uppercase]: uppercase },
		styles[`${align}`],
		styles[`${family}`],
		{ [styles.dynamicLite]: dynamicLite }
	);
	return <Tag className={className}>{children}</Tag>;
};
