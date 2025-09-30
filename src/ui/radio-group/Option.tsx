import { useRef } from 'react';
import { OptionType } from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { useEnterSubmit } from './hooks/useEnterSubmit';

import styles from './RadioGroup.module.scss';

type OptionProps = {
	value: OptionType['value']; // значение опции (например, "red").
	title: OptionType['title']; //название опции (например, "Красный").
	selected: OptionType; //какая опция выбрана сейчас (весь объект OptionType).
	groupName: string; // имя группы радио-кнопок (чтобы браузер понял, что они связаны).
	onChange?: (option: OptionType) => void; //необязательная функция, которая вызывается при выборе.
	option: OptionType; // объект с полной информацией про текущую опцию.
};

export const Option = (props: OptionProps) => {
	const { value, title, selected, groupName, onChange, option } = props;

	const optionRef = useRef<HTMLDivElement>(null);
	// Функция, которая вызывается, когда пользователь выбирает опцию -КЛИК.
	const handleChange = () => onChange?.(option);
	// добавляем обработчик клавиши enter
	useEnterSubmit({ onChange, option });
	//  создаем уникальный id для input и label
	const inputId = `${groupName}_radio_item_with_value__${value}`;
	// проверяем, выбрана ли опция
	const isChecked = value === selected.title;

	return (
		<div
			className={styles.item}
			key={value}
			// пользовательские атрибуты:
			data-checked={isChecked} // выбрана ли опция?=> (кастомная отметка)
			data-testid={inputId} // атрибут для тестов (React Testing Library или Cypress).
			// позволяет переходить на элемент с помощью клавиши Tab.
			tabIndex={0}
			ref={optionRef}>
			<input
				className={styles.input}
				type='radio'
				name={groupName}
				id={inputId}
				value={value}
				onChange={handleChange}
				tabIndex={-1}
			/>
			<label className={styles.label} htmlFor={inputId}>
				<Text size={18} uppercase>
					{title}
				</Text>
			</label>
		</div>
	);
};
