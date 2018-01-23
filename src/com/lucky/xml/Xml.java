package com.lucky.xml;

import java.util.List;

/**
 * @author parainformaticos.com
 */
public class Xml {

    public Xml() {
    }

    /**
     * @param list debe tener 2 filas: titulos y datos
     * @return un documento XML
     */
    public StringBuilder toXml(List<Object[]> list) {

        Object[] ftil = (Object[]) list.get(0);
        Object[] fdat = (Object[]) list.get(1);

        StringBuilder sb = new StringBuilder("<bean>");
        for (int i = 0; i < ftil.length; i++) {
            sb.append("<nodo id=\"").append(ftil[i]).append("\">");
            Object campo = (fdat[i] == null) ? "" : fdat[i];
            sb.append(campo);
            sb.append("</nodo>");
        }
        sb.append("</bean>");

        return sb;
    }
    /**
     * @param list con Object[] viene toda la data
     * @return un documento XML
     */
    public static StringBuilder forQry(List<Object[]> list) {

        StringBuilder sb = new StringBuilder("<data>");
        sb.append("<msg></msg>");

        for (Object[] fils : list) {
            Object[] fil = (Object[]) fils;

            sb.append("<fil>");
            for (Object col : fil) {
                sb.append("<col>").append(col).append("</col>");
            }
            sb.append("</fil>");
        }
        sb.append("</data>");

        return sb;
    }
    
    /**
     * @param list con Object[2]: value y text de opciones de combo
     * @return un documento XML
     */
    public static StringBuilder forCbo(List<Object[]> list) {

        StringBuilder sb = new StringBuilder();
        sb.append("<?xml version='1.0' encoding='utf-8'?>");
        sb.append("<data>");
        sb.append("<msg></msg>");

        for (Object[] opt : list) {
            sb.append("<op id=\"").append(opt[0]).append("\">");
            sb.append(opt[1]);
            sb.append("</op>");
        }
        sb.append("</data>");

        return sb;
    }
    
    /**
     * @param titu viene titulo de cada columna
     * @param data viene data para cada columna
     * @return un documento XML
     */
    public static StringBuilder forUpd(String[] titu, Object[] data) {

        StringBuilder sb = new StringBuilder();
        sb.append("<?xml version='1.0' encoding='utf-8'?>");
        sb.append("<data>");
        sb.append("<msg></msg>");

        for (int i = 0; i < data.length; i++) {
            sb.append("<").append(titu[i]).append(" val=\"")
                    .append(data[i]).append("\"/>");
        }
        sb.append("</data>");

        return sb;
    }
    
    /**
    *
    * @param msg Un mensaje en formato XML
    * @return documento XML
    */
   public static StringBuilder forMsg(String msg) {
       StringBuilder sb = new StringBuilder();
       sb.append("<?xml version='1.0' encoding='utf-8'?>");
       
       sb.append("<data>");
       if ((msg != null) && (msg.trim().length() > 0)) {
           sb.append("<msg>").append(msg).append("</msg>");
       }
       sb.append("</data>");

       return sb;
   }
   
   /**
   *
   * @param msg Varios mensajes en formato XML
   * @return documento XML
   */
  public static StringBuilder forMsg(List<String> msg) {
      StringBuilder sb = new StringBuilder();
      sb.append("<?xml version='1.0' encoding='utf-8'?>");
      sb.append("<data>");

      for (String m : msg) {
          if ((m != null) && (m.trim().length() > 0)) {
              sb.append("<msg>").append(m).append("</msg>");
          }
      }

      sb.append("</data>");

      return sb;
  }
  
  /**
  *
  * @return documento XML en blanco
  */
 public static StringBuilder forMsg() {
     StringBuilder sb = new StringBuilder();
     sb.append("<?xml version='1.0' encoding='utf-8'?>");
     sb.append("<data></data>");
     return sb;
 }
    
}

