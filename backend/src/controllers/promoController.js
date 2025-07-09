const db = require('../config/db');

exports.checkPromo = async (req, res) => {
    const { code, totalAmount } = req.query;
    const clientId = req.user?.id; // или передай из токена/сессии

    try {
        const [rows] = await db.query(
            'SELECT * FROM PROMO_CODE WHERE Code = ? AND IsActive = TRUE AND (ValidUntil IS NULL OR ValidUntil > NOW())',
            [code]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Промокод недействителен' });
        }

        const promo = rows[0];

        // Проверка минимальной суммы заказа
        if (promo.MinOrderAmount && totalAmount < promo.MinOrderAmount) {
            return res.status(400).json({ error: `Минимальная сумма заказа: ${promo.MinOrderAmount} ₽` });
        }

        // Проверка лимита использования
        if (promo.MaxUses && promo.CurrentUses >= promo.MaxUses) {
            return res.status(400).json({ error: 'Лимит использования превышен' });
        }

        // Проверка, что пользователь ещё не использовал этот промокод
        if (promo.UsedBy !== null) {
            return res.status(400).json({ error: 'Вы уже использовали этот промокод' });
        }

        // Вычисление скидки
        let discount = 0;
        if (promo.DiscountType === 'fixed') {
            discount = promo.DiscountValue;
        } else if (promo.DiscountType === 'percent') {
            discount = (totalAmount * promo.DiscountValue) / 100;
        }

        // Обновляем статус промокода
        await db.query(
            'UPDATE PROMO_CODE SET CurrentUses = CurrentUses + 1, UsedBy = ? WHERE PromoCodeID = ?',
            [clientId, promo.PromoCodeID]
        );

        res.json({
            success: true,
            promoId: promo.PromoCodeID,
            discount,
            message: `Применён промокод: ${code}`
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
};  