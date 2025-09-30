import { useEffect, useRef } from 'react';
import { OptionType } from 'src/constants/articleProps';

type UseEnterSubmit = {
	onChange?: (option: OptionType) => void;
	option: OptionType;
};
// Хук позволяет «подвесить» к какому-то div (или другому элементу) реакцию на клавишу Enter.
// Если этот элемент в фокусе и пользователь нажал Enter, хук вызовет функцию onChange с нужной опцией (option).
export const useEnterSubmit = ({ onChange, option }: UseEnterSubmit) => {
	const optionRef = useRef<HTMLDivElement>(null); // вохмонжо ошибка, хук не возвращает реф
	useEffect(() => {
		const optionHtml = optionRef.current;

		if (!optionHtml) return; //

		const handleEnterKeyDown = (event: KeyboardEvent) => {
			// когда элемент в фокусе и нажата Enter
			if (document.activeElement === optionHtml && event.key === 'Enter') {
				// вызываем колбэк
				onChange?.(option);
			}
		};

		optionHtml.addEventListener('keydown', handleEnterKeyDown);

		// не забываем удалять листенеры, при размонтировании компонента
		return () => {
			optionHtml.removeEventListener('keydown', handleEnterKeyDown);
		};
	}, [onChange, option]);
};
