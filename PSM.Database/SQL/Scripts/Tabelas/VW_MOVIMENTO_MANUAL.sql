

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

IF (EXISTS (SELECT * FROM INFORMATION_SCHEMA.VIEWS WHERE TABLE_NAME = 'VW_MOVIMENTO_MANUAL'))  DROP VIEW [dbo].[VW_MOVIMENTO_MANUAL]
GO


CREATE VIEW [dbo].[VW_MOVIMENTO_MANUAL]
AS
	SELECT  
		MOVIMENTO_MANUAL.DAT_MES				AS DAT_MES,
		MOVIMENTO_MANUAL.DAT_ANO				AS DAT_ANO,
		MOVIMENTO_MANUAL.NUM_LANCAMENTO			AS NUM_LANCAMENTO,
		MOVIMENTO_MANUAL.COD_PRODUTO			AS COD_PRODUTO,
		PRODUTO.DES_PRODUTO						AS DES_PRODUTO,
		MOVIMENTO_MANUAL.COD_COSIF				AS COD_COSIF,
		MOVIMENTO_MANUAL.DES_DESCRICAO			AS DES_DESCRICAO,
		MOVIMENTO_MANUAL.DAT_MOVIMENTO			AS DAT_MOVIMENTO,
		MOVIMENTO_MANUAL.COD_USUARIO			AS COD_USUARIO,
		MOVIMENTO_MANUAL.VAL_VALOR				AS VAL_VALOR
		


FROM	MOVIMENTO_MANUAL
			INNER JOIN PRODUTO ON MOVIMENTO_MANUAL.COD_PRODUTO = PRODUTO.COD_PRODUTO

GO
