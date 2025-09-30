import { useEffect } from 'react';
import { OptionType } from 'src/constants/articleProps';

type UseEnterOptionSubmit = {
	onClick: (value: OptionType['value']) => void; // функция которая вызывается при выборе конкретной опции
	value: OptionType['value']; // значение опции
	optionRef: React.RefObject<HTMLLIElement>; //ссылка на опцию напр li
};
// обработать нажатие клавиши Enter на конкретной опции (элементе списка).
export const useEnterOptionSubmit = ({
	onClick, // функция для обработки нажатия Enter на опцию
	value, // значение опции
	optionRef, // ссылка на пункт списка
}: UseEnterOptionSubmit) => {
	// подписку на событие клавиатуры реалзиуем через useEffect(сайд эффект)
	useEffect(() => {
		const option = optionRef.current; // DOM-элемент через optionRef.current.
		if (!option) return; //Если optionRef.current ещё пустой (null), выходим.
		// функция обработчик клавиши Enter
		const handleEnterKeyDown = (event: KeyboardEvent) => {
			// если элемент в фокусе и нажата Enter
			if (document.activeElement === option && event.key === 'Enter') {
				onClick(value);
			}
		};
		// подписываемся на событие нажатия Enter на элемент li опции и удаляем уго при размонтировании
		option.addEventListener('keydown', handleEnterKeyDown);
		return () => {
			option.removeEventListener('keydown', handleEnterKeyDown);
		};
	}, [value, onClick, optionRef]);
};

// useEffect зависит от value, onClick, optionRef.
// при изменении значения (value) → вызывался правильный аргумент;

// при изменении функции (onClick) → использовался актуальный обработчик;

// при изменении DOM-элемента (optionRef) → слушатель повесился на новый элемент.
// Если они изменятся → эффект пересоздастся: старый обработчик уберётся, новый повесится.
