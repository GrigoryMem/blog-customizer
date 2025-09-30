import { useState, useRef } from 'react';
import type { MouseEventHandler } from 'react'; // тип событие функция
import clsx from 'clsx';
import { OptionType } from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import arrowDown from 'src/images/arrow-down.svg';
import { Option } from './Option'; // опция li
import { isFontFamilyClass } from './helpers/isFontFamilyClass'; // корректно ли имя шрифта
import { useEnterSubmit } from './hooks/useEnterSubmit'; //открывает или закрывает селект при нажатии Enter на плейсхолдер
import { useOutsideClickClose } from './hooks/useOutsideClickClose'; // закрывает селект при клике вне его

import styles from './Select.module.scss';

export type SelectProps = {
	selected: OptionType | null; // выбрана опция или нет?
	options: OptionType[]; // массив всех опций
	placeholder?: string; // текст подказки если ничего не выбрано
	onChange?: (selected: OptionType) => void; // функция при выборе опции
	onClose?: () => void; // функция при закрытии селекта
	title?: string;
	// selectStatus?: 'valid' | 'invalid'; //??? временное решение
};

// onClose и onChange не написаны, возмонжо они передаются через родителя

export const Select = (props: SelectProps) => {
	const {
		options,
		placeholder,
		selected,
		onChange,
		onClose,
		title,
		// selectStatus,
	} = props;
	const [isOpen, setIsOpen] = useState<boolean>(false); // открыт ли селект
	// isOpen -состояние при котором показываются элементы или нет
	const rootRef = useRef<HTMLDivElement>(null); // контейнер селекта(для закрытия)
	// добавил стейт и изменил обработчик
	// selected вмесо передаем selected={selectedValue}
	// const [selectedValue, setSelected] = useState<OptionType | null>(selected);
	// rootRef  -неодбходим для кликов вне селекта
	const placeholderRef = useRef<HTMLDivElement>(null); // для клика на селект
	const optionClassName = selected?.optionClassName ?? ''; // класс опции
	// Используем хук для закрытия селекта при клике вне него.
	useOutsideClickClose({
		isOpen,
		rootRef, // ссылка на корневой элемент селекта
		onClose,
		onChange: setIsOpen, // определяем параметр "на месте"
	});
	//  октрытие/закрытие селект - хук по кл авиша Enter
	useEnterSubmit({
		placeholderRef, // ссылка на "селект"(дочер элемент)
		onChange: setIsOpen,
	});
	//для клика по опции
	const handleOptionClick = (option: OptionType) => {
		setIsOpen(false); // закрываем крневой элемент селекта
		onChange?.(option); // вызываем КАКУЮ-ТО функцию с выбранной опцией чтобы обозначить чтоона выбрана???
		// setSelected(option); // выставляем выбранную опцию!
		// // везде меняем selected на selectedValue
		// console.log(option)
	};
	//  функцция для клика на плейсхолдер, открывваем/закрываем селект
	const handlePlaceHolderClick: MouseEventHandler<HTMLDivElement> = () => {
		setIsOpen((isOpen) => !isOpen);
	};

	return (
		<div className={styles.container}>
			{/* заголов селекта */}
			{title && (
				<>
					<Text size={12} weight={800} uppercase>
						{title}
					</Text>
				</>
			)}
			<div
				className={styles.selectWrapper}
				ref={rootRef}
				data-is-active={isOpen} // стилизуем открытое состояние
				data-testid='selectWrapper'>
				<img src={arrowDown} alt='иконка стрелочки' className={styles.arrow} />
				{/* "элемент селекта": */}
				<div
					className={clsx(
						styles.placeholder,
						(styles as Record<string, string>)[optionClassName]
					)}
					// data-status={status}
					// data-status={selectStatus}
					data-selected={!!selected?.value} // передаем для стилизации инверт зн выбран опции
					onClick={handlePlaceHolderClick}
					role='button'
					tabIndex={0} // работа tab стандартно
					ref={placeholderRef}>
					{/* текст для выбранной опции: */}
					<Text
						family={
							isFontFamilyClass(selected?.className)
								? selected?.className
								: undefined
						}>
						{selected?.title || placeholder}
					</Text>
				</div>
				{isOpen && (
					<ul className={styles.select} data-testid='selectDropdown'>
						{options
							// фильтруем выбранную опцию чтобы не показывать ее в открыв списке
							.filter((option) => selected?.value !== option.value)
							.map((option) => (
								<Option
									key={option.value}
									option={option}
									onClick={() => handleOptionClick(option)}
								/>
							))}
					</ul>
				)}
			</div>
		</div>
	);
};
